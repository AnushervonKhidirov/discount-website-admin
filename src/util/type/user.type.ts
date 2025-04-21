export type User = {
  id: number;
  username: string;
  role: Role;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateUserData = Pick<User, 'username' | 'role' | 'archived'>;

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}
