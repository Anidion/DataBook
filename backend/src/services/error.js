const ErrorService = {
  handleError: (err, message) => {
    console.error(message, err);
    return {
      error: `${message}: ${err.message || err || "Unknown error."}`,
    };
  },
};

export default ErrorService;
