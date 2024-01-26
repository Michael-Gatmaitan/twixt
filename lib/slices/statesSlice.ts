import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: IStates = {
  showSidebar: false,
  showLogoutModal: false,
};

export const stateSlice = createSlice({
  name: "stateslice",
  initialState,
  reducers: {
    toggleShowSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },

    toggleShowLogoutModal: (state, action: PayloadAction<boolean>) => {
      state.showLogoutModal = action.payload;
    },
  },
});

export const { toggleShowSidebar, toggleShowLogoutModal } = stateSlice.actions;

export const selectShowSidebar = (state: RootState) =>
  state.statesSlice.showSidebar;
export const selectShowLogoutModal = (state: RootState) =>
  state.statesSlice.showLogoutModal;

export default stateSlice.reducer;
