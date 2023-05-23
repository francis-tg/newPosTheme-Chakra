import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  socketConnect: false,
  socket: undefined
};

export const socketState = createSlice({
  name: "socketState",
  initialState,
  reducers: {
    setSocketConnect: (state, action) => {
      state.socketConnect = action.payload;
    },
    setsocket: (state, action) => {
      state.socket = action.payload;
    }
  }
});

export const {setSocketConnect, setsocket} = socketState.actions;

export default UserState.reducer;
