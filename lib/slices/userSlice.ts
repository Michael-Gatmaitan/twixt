import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: UserType = {
  username: "",
  password: "",
  mongodbID: "",
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "userslice",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      // set username
      const username = action.payload;
      if (username === "") throw new Error("Username cannot be empty");

      state.username = username;
    },

    setPassword: (state, action: PayloadAction<string>) => {
      // set password
      const password = action.payload;
      if (password === "") throw new Error("User password cannot be empty");

      state.password = password;
    },

    setMongodbID: (state, action: PayloadAction<string>) => {
      const mongodbID = action.payload;
      console.log("MongoDB id has been set.");
      state.mongodbID = mongodbID;
    },

    setLoggedin: (state, action: PayloadAction<boolean>) => {
      const loggedIn = action.payload;
      console.log("Use logged in set to : ", loggedIn);
      state.loggedIn = loggedIn;
    },
  },
});

export const { setUsername, setPassword, setMongodbID, setLoggedin } =
  userSlice.actions;

export const selectUsername = (state: RootState) => state.userSlice.username;
export const selectPassword = (state: RootState) => state.userSlice.password;
export const selectLoggedIn = (state: RootState) => state.userSlice.loggedIn;
export const selectMongodbID = (state: RootState) => state.userSlice.mongodbID;

export default userSlice.reducer;
