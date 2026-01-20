import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


export const loginUser: any = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: any, { rejectWithValue }: any) => {
    try {
      const res = await axios.post(
        "https://fakestoreapi.com/auth/login",
        {
          username: email,
          password: password,
        }
      );

      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (err) {
      toast.error("Incorrect Email Or Password!");
      return rejectWithValue("Invalid email or password");
    }
  }
);


export const signupUser: any = createAsyncThunk(
  "auth/signupUser",
  async (
    { email, password, repeatPassword }: any,
    { rejectWithValue }: any
  ) => {
    try {
      if (!email || !password || !repeatPassword) {
        toast.error("All fields are required!");
        return rejectWithValue("All fields are required");
      }

      if (password !== repeatPassword) {
        toast.error("Passwords do not match!");
        return rejectWithValue("Passwords do not match");
      }

      const res = await axios.post("https://fakestoreapi.com/users", {
        email: email,
        username: email,
        password: password,
      });

      toast.success("Signup successful! Please login.");

      return res.data;
    } catch (err) {
      toast.error("Signup failed!");
      return rejectWithValue("Signup failed");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
