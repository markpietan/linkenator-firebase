import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from "../features/user/userSlice"
import firebaseReducer from '../features/firebase/firebaseslice';
import loaderReducer from "../features/loader/loaderslice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    firebase: firebaseReducer,
    userLoggedIN: userReducer,
    loader: loaderReducer
  },
});
