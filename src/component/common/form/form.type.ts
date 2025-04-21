import type { AdditionalProps } from '@type/common.type';

export type FormProps<> = AdditionalProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => Promise<void>;
  title?: string;
  submitBtnText?: string;
}>;
