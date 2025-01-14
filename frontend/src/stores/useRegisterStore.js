import { create } from "zustand";

const useRegisterStore = create((set) => ({
  showRegisterMenu: false,
  setShowRegisterMenu: (value) => set({ showRegisterMenu: value }),
  toggleRegisterMenu: () =>
    set((state) => ({ showRegisterMenu: !state.showRegisterMenu })),
}));

export default useRegisterStore;
