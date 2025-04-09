export class CustomError {
  error: string;
  message?: string | string[];

  constructor(error: string, message?: string | string[]) {
    this.error = error;
    this.message = message;
  }
}
