import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    isError: null,

    login: async () => {
        set({ isLoading: true, isError: null });

        const user = {
            "username": "hopkins",
            "password": "William56$hj",
        };

        try {
            await axios.post("https://fakestoreapi.com/auth/login", user);
            set({ user, isLoading: false });
            toast.success("Successfully Login!", { position: "top-center" });
        } catch (error) {
            set({ isError: error.message, isLoading: false });
        }
    },

    signup: async (email: any, password: any) => {
        set({ isLoading: true, isError: null });

        const user = { email, password };

        try {
            const res = await axios.post("https://fakestoreapi.com/users", user);
            set({ user: res.data, isLoading: false });
            toast.success("Successfully Signed Up!", { position: "top-center" });
        } catch (error) {
            set({ isError: error.message, isLoading: false });
            toast.error("Signup failed!", { position: "top-center" });
        }
    },
}));
