import { createSlice } from "@reduxjs/toolkit";
import  firebase  from "../../library/firebase";

const initialState = {
  db: firebase,
};

export const firebaseSlice = createSlice({
  name: "database",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
});

export default firebaseSlice.reducer;