import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isAuth: sessionStorage.getItem("token") ? true : false,
  userData: {}
};

export const UserState = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUserStatus: (state, action) => {
      state.isAuth = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    logout(state, payload) {
      sessionStorage.removeItem("token");
      state.userData = {};
      return window.location.reload();
    }
  }
});

export const {setUserStatus, setUserData, logout} = UserState.actions;

export default UserState.reducer;
