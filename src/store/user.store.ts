import type { User } from '@type/user.type';

import { create } from 'zustand';

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set(() => ({ user })),
}));
