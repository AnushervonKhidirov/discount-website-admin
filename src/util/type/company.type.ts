export type Company = {
  id: number;
  name: string;
  about: string | null;
  logoUrl: string | null;
  archived: boolean;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};

export type UpdateCompanyData = Pick<Company, 'name' | 'about' | 'verified' | 'archived'>;
