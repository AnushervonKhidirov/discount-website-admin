import { CustomError } from '@error/custom.error';
import { HttpError } from '../error/http.error';

export type ReturnWithErr<T = unknown> = [T, null] | [null, HttpError | CustomError];
export type ReturnPromiseWithErr<T = unknown> = Promise<ReturnWithErr<T>>;
