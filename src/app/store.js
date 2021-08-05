import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import firebaseReducer from "../features/firebase/firebaseslice";
import loaderReducer from "../features/loader/loaderslice";

const middleWare = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    userLoggedIN: userReducer,
    loader: loaderReducer,
  },
  middleware: middleWare,
});
