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

const BookingSchema = z.object({
  astrologer_id: z.coerce.number(),
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Invalid email address."),
  phone_number: z.string().min(10, "A valid phone number is required."),
  address: z.string().min(5, "Address is required."),
  session_book_date: z.string(), // Already formatted as 'yyyy-MM-dd'
  session_book_time: z.string().min(1, "Please select a time."),
});

interface BookingState {
  success: boolean;
  message: string;
}

export async function createBooking(
  prevState: BookingState | undefined,
  formData: FormData
): Promise<BookingState> {
  const validatedFields = BookingSchema.safeParse({
    astrologer_id: formData.get("astrologer_id"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone_number: formData.get("phone_number"),
    address: formData.get("address"),
    session_book_date: formData.get("session_book_date"),
    session_book_time: formData.get("session_book_time"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid data provided: " + validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch("https://api.astrobarta.com/api/create_booking.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
      cache: "no-store",
    });

     if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error Response:", errorText);
        return { success: false, message: `Server error: ${res.statusText}. Please try again.` };
    }

    const result = await res.json();

    if (result.status === "success") {
      return { success: true, message: result.message || "Booking confirmed!" };
    } else {
      return { success: false, message: result.message || "An error occurred during booking." };
    }
  } catch (e) {
    console.error(e);
    return { success: false, message: "Our cosmic signals are weak. Please try again later." };
  }
}
