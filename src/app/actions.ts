"use server";

import { dailyHoroscope } from "@/ai/flows/astrologer-matchmaking";
import { z } from "zod";

const HoroscopeSchema = z.object({
  zodiacSign: z.string().min(1, { message: "Please select a zodiac sign." }),
});

interface HoroscopeState {
  horoscope?: string;
  zodiacSign?: string;
  error?: string;
}

export async function getDailyHoroscope(
  prevState: HoroscopeState,
  formData: FormData
): Promise<HoroscopeState> {
  const validatedFields = HoroscopeSchema.safeParse({
    zodiacSign: formData.get("zodiacSign"),
  });

  if (!validatedFields.success) {
    return {
      error: "Please select a valid zodiac sign.",
    };
  }

  const zodiacSign = validatedFields.data.zodiacSign;

  try {
    const result = await dailyHoroscope({ zodiacSign });
    return { horoscope: result.horoscope, zodiacSign };
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
    const firstError = Object.values(
      validatedFields.error.flatten().fieldErrors
    ).flat()[0];
    return {
      success: false,
      message: firstError || "Invalid data. Please check your inputs.",
    };
  }

  try {
    // PHP scripts often expect form-urlencoded data instead of JSON.
    const dataToSend: Record<string, string> = {};
    for (const [key, value] of Object.entries(validatedFields.data)) {
        dataToSend[key] = String(value);
    }
    const body = new URLSearchParams(dataToSend);

    const res = await fetch(
      "https://api.astrobarta.com/create_booking.php",
      {
        method: "POST",
        // The Content-Type header is automatically set to 'application/x-www-form-urlencoded'
        // when using URLSearchParams as the body.
        body: body,
        cache: "no-store",
      }
    );

    if (!res.ok) {
      let errorMessage = `Server error: ${res.statusText}. Please try again.`;
      try {
        const errorResult = await res.json();
        if (errorResult && errorResult.message) {
          errorMessage = errorResult.message;
        }
      } catch (e) {
        // Response body was not JSON, we'll use the statusText.
      }
      console.error("API Error Response:", errorMessage);
      return { success: false, message: errorMessage };
    }

    // If the response is OK, we assume success.
    // Try to parse a more specific message from the response body.
    let successMessage = "Booking confirmed!";
    try {
      const result = await res.json();
      if (result && result.message) {
        successMessage = result.message;
      }
    } catch (e) {
      // Response body was empty or not JSON. That's okay, we'll use the default message.
    }
    return { success: true, message: successMessage };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Our cosmic signals are weak. Please try again later.",
    };
  }
}
