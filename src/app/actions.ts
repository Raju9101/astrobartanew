"use server";

import {
  astrologerMatchmaking,
  type AstrologerMatchmakingOutput,
} from "@/ai/flows/astrologer-matchmaking";
import { z } from "zod";

const MatcherSchema = z.object({
  query: z
    .string()
    .min(10, {
      message: "Please describe your question in at least 10 characters.",
    }),
});

interface MatcherState {
  result?: AstrologerMatchmakingOutput;
  error?: string;
}

export async function findMyAstrologer(
  prevState: MatcherState,
  formData: FormData
): Promise<MatcherState> {
  const validatedFields = MatcherSchema.safeParse({
    query: formData.get("query"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.query?.join(", "),
    };
  }

  try {
    const result = await astrologerMatchmaking({
      query: validatedFields.data.query,
    });
    return { result };
  } catch (e) {
    console.error(e);
    return { error: "Our cosmic signals are weak. Please try again later." };
  }
}
