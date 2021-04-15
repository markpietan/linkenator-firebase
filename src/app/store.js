import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import firebaseReducer from '../features/firebase/firebaseslice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    firebase: firebaseReducer,
  },
});
