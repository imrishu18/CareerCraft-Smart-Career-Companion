"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generate a multiple-choice quiz for the logged-in user.
 * - Uses user's industry (and skills, if available) to generate 10 technical questions.
 * - Validates AI response to ensure JSON format is correct.
 */
export async function generateQuiz() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized user");

  // Fetch user details to personalize quiz
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { industry: true, skills: true },
  });

  if (!user) throw new Error("User not found");
  if (!user.industry) throw new Error("User industry not set");

  const skillsText = user.skills?.length
    ? ` with expertise in ${user.skills.join(", ")}`
    : "";

  // Prompt to Gemini for quiz generation
  const prompt = `
    Generate 10 technical interview questions for a ${user.industry} professional${skillsText}.
    Each question should be multiple choice with 4 options.
    Return ONLY this JSON (no notes, no markdown):
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleaned = text.replace(/```(?:json)?\n?/g, "").trim();
    const quiz = JSON.parse(cleaned);

    if (!quiz.questions || !Array.isArray(quiz.questions)) {
      throw new Error("Invalid quiz format from AI");
    }

    return quiz.questions;
  } catch (err) {
    console.error("Error generating quiz:", err);
    throw new Error("Failed to generate quiz questions");
  }
}

/**
 * Save quiz results after user attempts.
 * - Stores each question with user answers and correctness.
 * - Generates a short improvement tip from Gemini if wrong answers exist.
 */
export async function saveQuizResult(questions, answers, score) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized user");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  // Build structured results for each question
  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  // Extract wrong answers for improvement feedback
  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  let improvementTip = null;
  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
      The user got the following ${user.industry} interview questions wrong:
      ${wrongQuestionsText}

      Based on these, give 1 concise improvement tip (max 2 sentences).
      Be encouraging and focus on what to learn/practice.
    `;

    try {
      const tipResult = await model.generateContent(improvementPrompt);
      improvementTip = tipResult.response.text().trim();
    } catch (err) {
      console.error("Error generating improvement tip:", err);
      improvementTip = "Focus on strengthening core fundamentals in your domain.";
    }
  }

  // Save results in the database
  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults ?? [],
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (err) {
    console.error("Error saving quiz result:", err);
    throw new Error("Failed to save quiz result");
  }
}

/**
 * Fetch all previous assessments for the logged-in user.
 * - Returns results ordered by most recent first.
 */
export async function getAssessments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized user");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const assessments = await db.assessment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" }, 
    });

    return assessments;
  } catch (err) {
    console.error("Error fetching assessments:", err);
    throw new Error("Failed to fetch assessments");
  }
}
