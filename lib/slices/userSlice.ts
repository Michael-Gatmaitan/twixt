import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: UserType = {
  username: "",
  password: "",
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "userslice",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<{ username: string }>) => {
      // set username
      const { username } = action.payload;
      if (username === "") {
        throw new Error("Username cannot be empty");
      }

      state.username = action.payload.username;
    },

    setPassword: (state, action: PayloadAction<{ password: string }>) => {
      // set password
      const { password } = action.payload;
      if (password === "") {
        throw new Error("User password cannot be empty");
      }

      state.password = password;
    },

    setLoggedin: (state, action: PayloadAction<{ loggedIn: boolean }>) => {
      console.log("Use logged in set to : ", action.payload.loggedIn);
      state.loggedIn = action.payload.loggedIn;
    },
  },
});

export const { setUserName, setPassword, setLoggedin } = userSlice.actions;

export const selectUsername = (state: RootState) => state.userSlice.username;
export const selectpassword = (state: RootState) => state.userSlice.password;
export const selectLoggedIn = (state: RootState) => state.userSlice.loggedIn;

export default userSlice.reducer;
