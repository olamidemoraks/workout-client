import { SliceCaseReducers, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  socket?: any | null;
  newNotification: boolean;
}

const socketSlice = createSlice<
  IInitialState,
  SliceCaseReducers<IInitialState>
>({
  name: "socket",
  initialState: {
    socket: null,
    newNotification: false,
  },
  reducers: {
    getSocket: (state: IInitialState, action: any) => {
      state.socket = action.payload.socket;
    },

    receiveNotification: (state: IInitialState) => {
      state.newNotification = true;
    },

    readNotification: (state: IInitialState) => {
      state.newNotification = false;
    },
  },
});

export const { getSocket, receiveNotification, readNotification } =
  socketSlice.actions;

export default socketSlice.reducer;
