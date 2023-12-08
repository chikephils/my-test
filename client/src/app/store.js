import { configureStore } from "@reduxjs/toolkit";
import sectorReducer from "../features/sectors/sectorSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    sectors: sectorReducer,
    user: userReducer,
  },
});
