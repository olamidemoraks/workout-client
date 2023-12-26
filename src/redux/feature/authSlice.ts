import { SliceCaseReducers, createSlice } from "@reduxjs/toolkit";

interface IUser {
  _id: string;
  name: string;
  email: string;
  username: string;
  step: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  gender: string;
  height: string;
  weight: string;
  age: Date;
}

interface IInitialState {
  user?: IUser | null;
}

const authSlice = createSlice<IInitialState, SliceCaseReducers<IInitialState>>({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    signInUser: (state: IInitialState, action: any) => {
      state.user = action.payload.user;
    },
    logoutUser: (state: IInitialState, action: any) => {
      state.user = null;
    },
  },
});

export const { signInUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
