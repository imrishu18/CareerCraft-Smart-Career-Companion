"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

/**
 * Update the logged-in user's profile.
 * - Ensures industry insight exists (creates if missing with AI insights).
 * - Updates user details in a transaction for data consistency.
 */
export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Use transaction to ensure industry + user update happen atomically
    const result = await db.$transaction(
      async (tx) => {
        //  Check if industry insight exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: { industry: data.industry },
        });

        //  If missing, generate AI insights & create new industry entry
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              // Set next update after 7 days
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        //  Update user profile
        const updatedUser = await tx.user.update({
          where: { id: user.id },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      { timeout: 10000 } // Increase timeout for long AI ops
    );

    // Revalidate cache so UI reflects latest user data
    revalidatePath("/");
    return result.updatedUser; // Fix: return updatedUser, not undefined
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

/**
 * Get onboarding status of the logged-in user.
 * - Checks if the user has set their industry (onboarding complete).
 */
export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { industry: true },
    });

    return {
      isOnboarded: !!user?.industry, //  true if industry is set
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}
