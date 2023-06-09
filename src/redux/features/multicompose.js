import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  SelectedItem: []
};

export const multiComposeState = createSlice({
  name: "multiCompose",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.SelectedItem = action.payload;
    }
  }
});

export const {setSelectedItem} = multiComposeState.actions;

export default multiComposeState.reducer;
