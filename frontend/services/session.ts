export const saveSession = async (user: any) => {
  let res: Response;
  try {
    res = await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      console.error("Failed to save session:", res);
      return;
    }

    console.log("session saved:", res);

    return res;
  } catch (error) {
    console.error("Failed to save session:", error);
  }
};

export const endSession = async () => {
  try {
    const res = await fetch("/api/session", {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Failed to end session:", res);
      return;
    }

    console.log("session ended:", res);
    return res;
  } catch (error) {
    console.error("Failed to end session:", error);
  }
};
