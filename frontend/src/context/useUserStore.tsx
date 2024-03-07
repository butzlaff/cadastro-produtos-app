import { create } from 'zustand';

type UserStore = {
  username:string;
}

const useUserStore = create((set) => ({
  user: null,
  setUser: (user: UserStore) => set({ user }),
}));

export default useUserStore;
