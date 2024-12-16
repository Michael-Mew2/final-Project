import { create } from "zustand";

const useUserStore = create((set, get) => ({
  user: {
    id: null,
    name: "",
  },

  setUser: (userData) => set({ user: userData }),

  getUser: () => get().user,

  clearUser: () => set({ user: { id: null, name: "" } }),
}));

export default useUserStore;