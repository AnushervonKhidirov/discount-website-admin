import { CustomError } from './custom.error';

export class HttpError extends CustomError {
  status: number;

  constructor(status: number, error: string, message?: string | string[]) {
    super(error, message);
    this.status = status;
  }
}
