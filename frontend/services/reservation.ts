import { backend } from "./axios";

export const createReservation = async ({ isbn }: { isbn: string }) => {
  try {
    const result = await backend.post("/reservation", {
      isbn,
    });
    return result;
  } catch (error) {
    console.error("Failed to create reservation:", error);
  }
};
