class NotFoundError extends Error {
  constructor(id, ...params) {
    super(...params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
    this.name = "NotFoundError";
    this.id = id;
    this.message = `Resource not found. ID [${this.id}]`;
    this.date = new Date();
  }
}

class CreateError extends Error {
  constructor(id, ...params) {
    super(...params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CreateError);
    }
    this.name = "CreateError";
    this.id = id;
    this.message = `Unable to create resource. ID [${this.id}]. Error [${this.message}]`;
    this.date = new Date();
  }
}

class UpdateError extends Error {
  constructor(id, ...params) {
    super(...params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UpdateError);
    }
    this.name = "UpdateError";
    this.id = id;
    this.message = `Unable to update resource. ID [${this.id}]. Error [${this.message}]`;
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

module.exports = {
  NotFoundError,
  InvalidUserIdError,
  UpdateError,
  CreateError
};
