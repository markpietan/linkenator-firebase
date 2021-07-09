import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../features/user/userSlice";
import firebase from "./../library/firebase";
import { getUserByUsername } from "../services/firebase";
const useAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (changedUser) => {
        if (changedUser) {
          const [response] = await getUserByUsername(changedUser.displayName);

          await dispatch(
            setUser({
              user: {
                photoURL: changedUser.photoURL,
                displayName: changedUser.displayName,
                email: changedUser.email,
                uid: changedUser.uid,
                docId: response.docId,
                favorites: response.favorites,
              },
            })
          );
        } else {
          await dispatch(setUser({ user: null }));
        }
      });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
};

export default useAuth;
