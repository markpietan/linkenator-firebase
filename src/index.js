import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// var firebaseConfig = {
//   apiKey: "AIzaSyBMsPH_ERKd4bRB3fEEChaPHC1o5qyoe5o",
//   authDomain: "linkenator-firebase.firebaseapp.com",
//   projectId: "linkenator-firebase",
//   storageBucket: "linkenator-firebase.appspot.com",
//   messagingSenderId: "552644696274",
//   appId: "1:552644696274:web:2674b33d4f080836b3350b",
//   measurementId: "G-K271YRD3JN"
// };