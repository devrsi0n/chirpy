export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  public readonly httpStatus: HttpStatus;
  public readonly extraData?: Record<string, string>;

  constructor(
    httpStatus: HttpStatus,
    message: string,
    extraData?: Record<string, string>,
  ) {
    super(message);
    this.httpStatus = httpStatus;
    this.extraData = extraData;
  }
}

export enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}
