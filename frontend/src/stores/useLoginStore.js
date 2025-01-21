import { create } from "zustand";

const useLoginStore = create((set) => ({
  username: "",
  setUsername: (newUsername) => set({ username: newUsername }),
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  backendError: null,
  setBackendError: (message) => set({ backendError: message }),
  successMessage: null,
  setSuccessMessage: (message) => set({ successMessage: message }),
  showForgotPassword: false,
  setShowForgotPassword: (status) => set({ showForgotPassword: status }),
  toggleForgotPassword: () =>
    set(state({ showForgotPassword: !state.showForgotPassword })),
}));

export default useLoginStore;
