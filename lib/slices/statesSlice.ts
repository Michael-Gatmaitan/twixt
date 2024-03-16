import { createSlice, PayloadAction as PA } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IStates, IFriendRequests, IFrRequestsSent } from "@/app";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage.external";

const initialState: IStates = {
  showSidebar: false,
  showLogoutModal: false,

  // For preventing
  friendRequests: [],
  friendRequestsSent: [],
  authProcessing: true,
};

export const stateSlice = createSlice({
  name: "stateslice",
  initialState,
  reducers: {
    toggleShowSidebar: (state, action: PA<boolean>) => {
      state.showSidebar = action.payload;
    },

    toggleShowLogoutModal: (state, action: PA<boolean>) => {
      state.showLogoutModal = action.payload;
    },

    setFriendRequests: (state, action: PA<IFriendRequests[]>) => {
      state.friendRequests = action.payload;
    },

    removeFriendRequestByID: (state, action: PA<string>) => {
      const friendshipID = action.payload;
      state.friendRequests.filter((fr) => fr._id !== friendshipID);
    },

    setFriendRequestsSent: (state, action: PA<IFrRequestsSent[]>) => {
      state.friendRequestsSent = action.payload;
    },

    removeFriendRequestsSentByID: (state, action: PA<string>) => {
      const friendshipID = action.payload;
      state.friendRequestsSent.filter((fr) => fr._id !== friendshipID);
    },

    toggleAuthProcessing: (state, action: PA<boolean>) => {
      state.authProcessing = action.payload;
    },
  },
});

export const {
  toggleShowSidebar,
  toggleShowLogoutModal,
  setFriendRequests,
  removeFriendRequestByID,
  setFriendRequestsSent,
  removeFriendRequestsSentByID,
  toggleAuthProcessing,
} = stateSlice.actions;

export const selectShowSidebar = (state: RootState) =>
  state.statesSlice.showSidebar;
export const selectShowLogoutModal = (state: RootState) =>
  state.statesSlice.showLogoutModal;
export const selectFriendRequests = (state: RootState) =>
  state.statesSlice.friendRequests;
export const selectFriendRequestsSent = (state: RootState) =>
  state.statesSlice.friendRequestsSent;
export const selectAuthProcessing = (state: RootState) =>
  state.statesSlice.authProcessing;

export default stateSlice.reducer;
