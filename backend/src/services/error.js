export const ErrorService = {
  handleError: (err, message) => {
    console.error(message, err);
    return {
      error: `${message ? `${message}: ` : ""}${err && (err?.message || err)}`,
    };
  },
};
