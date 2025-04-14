export type Bank = Readonly<{
  id: number;
  name: string;
  logoUrl?: string;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}>;
