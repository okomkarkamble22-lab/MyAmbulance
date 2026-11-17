// Provides centralized Express error handling.
export const notFoundHandler = (request, response) => {
  response.status(404).json({ message: `Route not found: ${request.method} ${request.originalUrl}` });
};

export const errorHandler = (error, request, response, next) => {
  void request;
  void next;
  console.error(error);
  response.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
};
