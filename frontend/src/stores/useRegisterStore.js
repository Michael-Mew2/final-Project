import { create } from "zustand";

const useRegisterStore = create((set) => ({
  showRegisterMenu: false,
  setShowRegisterMenu: (value) => set({ showRegisterMenu: value }),
  toggleRegisterMenu: () =>
    set((state) => ({ showRegisterMenu: !state.showRegisterMenu })),

  successMessage: null,
  setSuccessMessage: (message) => set({successMessage: message}),
  backendError: null,
  setBackendError: (message) => set({backendError: message})
}));

export default useRegisterStore;
