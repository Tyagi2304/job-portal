const throwError = (statusCode, response) => {
  const error = new Error(response.message || "Error");
  error.statusCode = statusCode;
  error.response = response;
  throw error;
};

export default throwError;
