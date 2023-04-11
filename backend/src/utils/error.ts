import httpStatus from "http-status";

class CustomError {
  message: string;
  error: { [key: string]: any } | null | undefined;
  code: number;
  constructor(message: string, error?: { [key: string]: any }, code?: number) {
    this.message = message;
    this.error = error;
    this.code = code || 400;
  }
}

// Define Bad Request Error
export class BadRequestError extends CustomError {
  constructor(message: string, error?: { [key: string]: any }) {
    super(message, error, httpStatus.BAD_REQUEST);
  }
}

// Define Unauthorized Error
export class UnauthorizedError extends CustomError {
  constructor(message: string, error?: { [key: string]: any }) {
    super(message, error, httpStatus.UNAUTHORIZED);
  }
}

// Define Forbidden Error

export class ForbiddenError extends CustomError {
  constructor(message: string, error?: { [key: string]: any }) {
    super(message, error, httpStatus.FORBIDDEN);
  }
}

export const handleError = (err: any) => {
  if (err instanceof CustomError) {
    return {
      message: err.message,
      error: err?.error || err,
      code: err.code,
    };
  }

  return {
    message: err?.message,
    code: httpStatus.INTERNAL_SERVER_ERROR,
  };
};
