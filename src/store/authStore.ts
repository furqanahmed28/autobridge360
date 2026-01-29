import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "importer" | "owner";

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string; role: UserRole } | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const userCredentials = {
  importer: { username: "importer", password: "pass123", role: "importer" as UserRole },
  owner: { username: "owner", password: "pass456", role: "owner" as UserRole }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      login: (username: string, password: string) => {
        // Check importer credentials
        if (username === userCredentials.importer.username && password === userCredentials.importer.password) {
          set({ isAuthenticated: true, user: { username, role: userCredentials.importer.role } });
          return true;
        }
        // Check owner credentials
        if (username === userCredentials.owner.username && password === userCredentials.owner.password) {
          set({ isAuthenticated: true, user: { username, role: userCredentials.owner.role } });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);