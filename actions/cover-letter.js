"use server"; 

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generates a professional cover letter for a given job.
 * Uses AI to generate content and stores it in the database.
 *
 * @param {Object} data - Cover letter request data
 * @param {string} data.jobTitle - Job title applied for
 * @param {string} data.companyName - Target company name
 * @param {string} data.jobDescription - Description of the job role
 * @returns {Promise<Object>} Newly created cover letter entry
 * @throws {Error} If user is unauthorized, missing fields, or AI request fails
 */
export async function generateCoverLetter(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  if (!data?.jobTitle || !data?.companyName || !data?.jobDescription) {
    throw new Error("Missing required fields");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    Write a professional cover letter for a ${data.jobTitle} position at ${data.companyName}.
    ...
  `;

  try {
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();

    return await db.coverLetter.create({
      data: {
        content,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        status: "completed",
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Error generating cover letter:", error.message);
    throw new Error("Failed to generate cover letter");
  }
}

/**
 * Fetch all cover letters for the authenticated user.
 *
 * @returns {Promise<Array>} List of cover letters ordered by newest first
 * @throws {Error} If user is unauthorized or query fails
 */
export async function getCoverLetters() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found");

    return await db.coverLetter.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching cover letters:", error.message);
    throw new Error("Failed to fetch cover letters");
  }
}

/**
 * Fetch a single cover letter by ID for the authenticated user.
 *
 * @param {string} id - Cover letter ID
 * @returns {Promise<Object|null>} Cover letter object or null if not found
 * @throws {Error} If user is unauthorized or query fails
 */
export async function getCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found");

    return await db.coverLetter.findUnique({
      where: { id, userId: user.id },
    });
  } catch (error) {
    console.error("Error fetching cover letter:", error.message);
    throw new Error("Failed to fetch cover letter");
  }
}

/**
 * Delete a cover letter by ID for the authenticated user.
 *
 * @param {string} id - Cover letter ID
 * @returns {Promise<Object>} Deleted cover letter entry
 * @throws {Error} If user is unauthorized or deletion fails
 */
export async function deleteCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found");

    return await db.coverLetter.delete({
      where: { id, userId: user.id },
    });
  } catch (error) {
    console.error("Error deleting cover letter:", error.message);
    throw new Error("Failed to delete cover letter");
  }
}
