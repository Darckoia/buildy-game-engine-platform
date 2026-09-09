export class BuildyError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number,
    public readonly details?: unknown
  ) {
    super(message);
  }
}

export class ValidationError extends BuildyError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION', 400, details);
  }
}

export class UnauthorizedError extends BuildyError {
  constructor(message = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

export class ForbiddenError extends BuildyError {
  constructor(message = 'Forbidden') {
    super(message, 'FORBIDDEN', 403);
  }
}
