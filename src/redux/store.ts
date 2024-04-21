import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/authSlice";
import socketSlice from "./feature/socketSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    socket: socketSlice,
  },
  devTools: true,
});
