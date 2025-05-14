class AppError extends Error {
  constructor(message, name = "AppError", statusCode = 400) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}