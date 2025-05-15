/* eslint-disable no-unused-vars */

class AppError extends Error {
  constructor(message, name = "AppError", statusCode = 400) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
