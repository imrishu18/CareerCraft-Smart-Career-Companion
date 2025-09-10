"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Save or update a user's resume in the database.
 * Uses Prisma upsert for reliability and revalidates cache for UI sync.
 *
 * @param {string} content - Resume content to be saved
 * @returns {Promise<Object>} The saved/updated resume record
 */
export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized: User not logged in");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found in database");

  try {
    const resume = await db.resume.upsert({
      where: { userId: user.id },
      update: { content },
      create: { userId: user.id, content },
    });

    // Refresh cache so UI shows the latest resume
    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Database error saving resume:", error);
    throw new Error("Failed to save resume. Please try again.");
  }
}

/**
 * Fetch the logged-in user's resume from the database.
 *
 * @returns {Promise<Object|null>} Resume object if found, otherwise null
 */
export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized: User not logged in");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found in database");

  return db.resume.findUnique({
    where: { userId: user.id },
  });
}

/**
 * Enhance a section of the resume using AI.
 * Ensures improvements are ATS-friendly, professional, and concise.
 *
 * @param {Object} params
 * @param {string} params.current - Current text to improve
 * @param {string} params.type - Section type (summary, experience, education, etc.)
 * @returns {Promise<string>}
 */
export async function improveWithAI({ current, type }) {
  if (!current || typeof current !== "string") {
    throw new Error("Invalid input: Resume content must be a non-empty string");
  }

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized: User not logged in");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: { industryInsight: true },
  });
  if (!user) throw new Error("User not found in database");

  const prompt = `
    You are a professional resume writer. Improve the following ${type} section 
    for a ${user.industry} professional.

    Current content: "${current}"

    Guidelines:
    - Use strong action verbs
    - Add measurable results (%, $, numbers) where applicable
    - Highlight relevant technical & industry skills
    - Keep concise (max 3–4 sentences)
    - Focus on achievements, not responsibilities
    - Include industry-specific keywords
    - For "Education", format as: [Degree], [Institution], [Year]

    Return only the improved text. Do not include markdown, notes, or extra formatting.
  `;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    text = text.replace(/```[\s\S]*?```/g, "").trim();

    if (!text) throw new Error("AI returned an empty response");

    return text;
  } catch (error) {
    console.error("AI resume improvement error:", error);
    throw new Error("Failed to improve resume content. Please try again.");
  }
}
