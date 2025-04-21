import type { ReturnWithErr } from '@type/return-with-error.type';

import { CustomError } from '@error/custom.error';
import { HttpError } from '@error/http.error';

export function isHttpError(data: object | HttpError): data is HttpError {
  return (data as HttpError).error !== undefined;
}

export function returnError<T>(err: unknown): ReturnWithErr<T> {
  if (err instanceof HttpError) return [null, err];
  return [null, new CustomError('Error', 'Something went wrong, please try again later.')];
}
