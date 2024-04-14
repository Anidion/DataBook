import { backend } from "./axios";

export const createTransaction = async ({ isbn }: { isbn: string }) => {
  try {
    const result = await backend.post("/transaction", {
      isbn,
    });
    return result;
  } catch (error) {
    console.error("Failed to create transaction:", error);
  }
};
