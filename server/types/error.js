class NonExistentUserError extends Error {
  constructor(id, ...params) {
    super(...params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NonExistentUserError);
    }
    this.name = "NonExistentUserError";
    this.id = id;
    this.message = `User does not exist. ID [${this.id}]`;
    this.date = new Date();
  }
}

class InvalidUserIdError extends Error {
  constructor(id, ...params) {
    super(...params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidUserIdError);
    }
    this.name = "InvalidUserIdError";
    this.id = id;
    this.message = `Invalid user ID. ID [${this.id}]`;
    this.date = new Date();
  }
}

module.exports = { NonExistentUserError, InvalidUserIdError };
