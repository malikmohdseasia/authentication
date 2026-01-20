import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    isLoading: false,
    isError: null,

    login: async (email: any, password: any) => {
        set({ isLoading: true, isError: null });

        const user = {
            "username": email,
            "password": password,
        };

        try {
            const res = await axios.post("https://fakestoreapi.com/auth/login", user);
            set({ user, isLoading: false });
            // toast.success("Successfully Login!", { position: "top-center" });
            localStorage.setItem('token', res.data.token);
            set({
                token: res.data.token,
                isAuthenticated: true,
                isLoading: false,
            })
        } catch (error: any) {
            set({ isError: error.message, isLoading: false });
            toast.error("Login failed!", { position: "top-center" });
        }
    },


    logout: () => {
        localStorage.removeItem('token');
        set({
            user: null,
            token: null,
            isAuthenticated: false
        })
    },

    signup: async (email: any, password: any) => {
        set({ isLoading: true, isError: null });

        const user = { email, password };

        try {
            const res = await axios.post("https://fakestoreapi.com/users", user);
            set({ user: res.data, isLoading: false });
            toast.success("Successfully Signed Up!", { position: "top-center" });
        } catch (error: any) {
            set({ isError: error.message, isLoading: false });
            toast.error("Signup failed!", { position: "top-center" });
        }
    },
}));


//Redux Login, SignUp And Fetch Products


// import { configureStore } from "@reduxjs/toolkit";
// import ProductSlice from "../store/ProductSlice";
// import AuthSlice from "../store/authSlice";

// export const Store = configureStore({
//     reducer:{
//         auth:AuthSlice,
//         product:ProductSlice
//     }
// });