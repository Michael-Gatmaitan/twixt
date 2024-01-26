import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@reduxjs/toolkit/query";
import { actionAsyncStorage } from "next/dist/client/components/action-async-storage.external";

const initialState: IStates = {
  showSidebar: false,
};

export const stateSlice = createSlice({
  name: "stateslice",
  initialState,
  reducers: {
    toggleShowSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { toggleShowSidebar } = stateSlice.actions;

export default stateSlice.reducer;
