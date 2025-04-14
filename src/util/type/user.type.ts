export type User = Readonly<{
  id: number;
  username: string;
  role: Role;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}>;

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}
