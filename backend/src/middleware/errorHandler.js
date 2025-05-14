const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : "Internal Server Error";
  const errorName = err instanceof AppError ? err.name : "BackendError";

  res.status(statusCode).json({ error: errorName, message });
};

module.exports = errorHandler;