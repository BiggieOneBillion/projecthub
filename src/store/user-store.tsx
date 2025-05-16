import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  details: {
    id: string;
    email: string;
    username: string;
    gitName: string;
  };

  isDefault: boolean;
  // isAuthenticated: boolean;
  setDetails: (value: { id: string; email: string; username: string }) => void;
  // setAuthenticated: (value: boolean) => void;
  setIsDefault: (value: boolean) => void;
  setGitName: (value: string) => void;
}

// Zustand store with persist and cookie storage
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // isAuthenticated: false,
      details: {
        id: "",
        email: "",
        username: "",
        gitName: "",
      },
      isDefault: false,
      // setAuthenticated: (value) => set({ isAuthenticated: value }),
      setIsDefault: (value) => set({ isDefault: value }),
      setDetails: (value) =>
        set({
          details: {
            id: value.id,
            email: value.email,
            username: value.username,
            gitName: "",
          },
        }),
      setGitName: (value: string) =>
        set((state) => ({ details: { ...state.details, gitName: value } })),
    }),
    {
      name: "auth", // Key name in sessionStorage
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage instead of localStorage
    }
    // {
    //   name: "auth", // The cookie name
    // },
  )
);
