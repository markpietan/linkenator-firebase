import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../features/user/userSlice";
import firebase from "./../library/firebase";
import { getUserByUsername } from "../services/firebase";
const useAuth = () => {
  const db = useSelector((state) => {
    return state.firebase.db;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (changedUser) => {
        if (changedUser) {
          const [response] = await getUserByUsername(changedUser.displayName);
          console.log(response);
          console.log(changedUser);
          await dispatch(
            setUser({
              user: {
                photoURL: changedUser.photoURL,
                displayName: changedUser.displayName,
                email: changedUser.email,
                uid: changedUser.uid,
                docId: response.docId,
              },
            })
          );
        }
      });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
};

export default useAuth;
