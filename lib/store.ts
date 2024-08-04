import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import statesSlice from "./slices/statesSlice";

const store = configureStore({
  reducer: {
    // Reducers
    userSlice,
    statesSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
