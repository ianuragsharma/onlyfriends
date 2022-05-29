import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  userData: {},
  isAuthLoading: false,
  authError: "",
  authToken: "",
};

const loginHandler = createAsyncThunk(
  "auth/loginHandler",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/login", {
        username,
        password,
      });

      return data;
    } catch (error) {
      const { status, message } = error.response;
      let errorMessage;
      if (status === 401) {
        errorMessage = "Wrong Credentials";
      } else if (status === 404) {
        errorMessage = "User not found";
      } else {
        errorMessage = message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);
const signupHandler = createAsyncThunk(
  "auth/signupHandler",
  async (userDetails, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/signup", {
        userDetails,
      });
      return data;
    } catch (error) {
      const { status, message } = error.response;
      let errorMessage;
      if (status === 422) {
        errorMessage = "Username Already Exists.";
      } else {
        errorMessage = message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutHandler: (state) => {
      state.userData = {};
      state.authError = "";
      state.authToken = "";
    },
  },
  extraReducers(builder) {
    // login
    builder.addCase(loginHandler.pending, (state) => {
      state.isAuthLoading = true;
      state.authError = "";
    });
    builder.addCase(loginHandler.fulfilled, (state, { payload }) => {
      state.isAuthLoading = false;
      state.authError = "";
      state.userData = payload.foundUser;
      state.authToken = payload.encodedToken;
    });
    builder.addCase(loginHandler.rejected, (state, { payload }) => {
      state.isAuthLoading = false;
      state.authError = payload;
      state.userData = {};
    });

    // signup
    builder.addCase(signupHandler.pending, (state) => {
      state.isAuthLoading = true;
      state.authError = "";
    });
    builder.addCase(signupHandler.fulfilled, (state, { payload }) => {
      state.isAuthLoading = false;
      state.authError = "";
      state.userData = payload.createdUser;
      state.authToken = payload.encodedToken;
    });
    builder.addCase(signupHandler.rejected, (state, { payload }) => {
      state.isAuthLoading = false;
      state.authError = payload;
      state.userData = {};
    });
  },
});

export const authReducer = authSlice.reducer;
export const { logoutHandler } = authSlice.actions;
export { loginHandler, signupHandler };
