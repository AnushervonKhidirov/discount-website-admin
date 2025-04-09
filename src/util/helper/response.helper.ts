import { CustomError } from '@error/custom.error';
import { HttpError } from '@error/http.error';
import { ReturnWithErr } from '@type/return-with-error.type';

export function isError(data: object | HttpError): data is HttpError {
  return (data as HttpError).error !== undefined;
}

export function returnError<T>(err: unknown): ReturnWithErr<T> {
  if (err instanceof HttpError) return [null, err];
  return [null, new CustomError('Error', 'Something went wrong, please try again later.')];
}
