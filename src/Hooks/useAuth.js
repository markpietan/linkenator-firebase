import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../features/user/userSlice";
import firebase from "./../library/firebase";
// firebase.auth().signOut()
const useAuth = () => {
  const db = useSelector((state) => {
    return state.firebase.db;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((changedUser) => {
      dispatch(setUser({ user: changedUser }));
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
};

export default useAuth;
