// Provides centralized Express error handling.
export const notFoundHandler = (request, response) => {
  response.status(404).json({ message: `Route not found: ${request.method} ${request.originalUrl}` });
};

export const errorHandler = (error, request, response, next) => {
  void request;
  void next;
  console.error(error);
  const statusCode = error.code === 11000 ? 409 : error.name === 'ValidationError' ? 400 : error.statusCode || 500;
  const payload = { message: error.code === 11000 ? 'An account with this email already exists' : error.message || 'Internal server error' };
  if (error.details) payload.details = error.details;
  response.status(statusCode).json(payload);
};
