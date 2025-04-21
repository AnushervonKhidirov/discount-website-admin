export type Bank = {
  id: number;
  name: string;
  logoUrl: string | null;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateBankData = Pick<Bank, 'name'>;
export type UpdateBankData = Pick<Bank, 'name' | 'archived'>;
