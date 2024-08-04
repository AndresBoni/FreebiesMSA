import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "@/store/slices/modalSlice";
import userReducer from "@/store/slices/userSlice";

export const store = configureStore({
  reducer: {
    modals: modalReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
