import { create } from "zustand";
import { loginUser, signupUser } from "@/utils/authHelpers";
import { AuthState } from "@/constants/type";

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    login: async (email, password) => {
        const data = await loginUser(email, password);
        set({ user: data, isAuthenticated: true });
    },

    signup: async (email, password) => {
        await signupUser(email, password);
        await useAuthStore.getState().login(email, password);
    },

    logout: async () => {
        document.cookie = "token=; Max-Age=0; path=/";
        set({ user: null, isAuthenticated: false });
    },

    fetchUser: async () => {
        try {
            const res = await fetch("/api/users/me");
            if (!res.ok) return;
            const data = await res.json();
            set({ user: data, isAuthenticated: true });
        } catch {
            set({ user: null, isAuthenticated: false });
        }
    },
}));
