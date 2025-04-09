import type { PropsWithChildren } from 'react';

export type AdditionalProps<T = unknown> = PropsWithChildren<T & { className?: string }>;

export type Cookie<T = unknown> = Partial<T> & { [key: string]: string };
