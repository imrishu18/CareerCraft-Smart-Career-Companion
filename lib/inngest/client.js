import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "careercraft", // Unique app ID
  name: "CareerCraft",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
