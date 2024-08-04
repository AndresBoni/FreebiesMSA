import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
  role?: string;
}

export interface UserState {
  token: string | null;
  user: User | null;
}

const initialState: UserState = {
  token: localStorage.getItem("token") || null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
