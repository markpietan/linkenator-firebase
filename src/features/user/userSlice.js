import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
 
});

export const { setUser} = userSlice.actions;




export default userSlice.reducer;
