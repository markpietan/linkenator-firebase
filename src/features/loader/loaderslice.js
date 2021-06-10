import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  visible: false,
  
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    showLoader: (state, action) => {
      state.visible = true;
      
    },
    hideLoader: (state, action) => {
      state.visible = false;
   
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
