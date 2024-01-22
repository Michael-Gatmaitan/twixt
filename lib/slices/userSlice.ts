import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: UserType = {
  username: "",
  password: "",
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
  },
});

export const { setUserName, setPassword } = userSlice.actions;

export const selectUsername = (state: RootState) => state.userSlice.username;
export const selectpassword = (state: RootState) => state.userSlice.password;

export default userSlice.reducer;
