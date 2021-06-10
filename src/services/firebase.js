import firebase from "./../library/firebase";
import firebaseapp from "firebase/app";

export async function addLink(userId, link, userName, userPhoto) {
  const response = await firebase.firestore().collection("link").add({
    userId,
    userName,
    userPhoto,
    link,
    dateCreated: Date.now(),
    likes: [],
  });
  return response.id;
}

export async function getNextTenLinks(lastLinkDocID) {
  const lastDoc = await firebase
    .firestore()
    .collection("link")
    .doc(lastLinkDocID)
    .get();
  console.log(lastDoc);
  const newLinks = await firebase
    .firestore()
    .collection("link")
    .orderBy("dateCreated", "desc")
    .limit(10)
    .startAfter(lastDoc)
    .get();
  console.log(newLinks);
  const transformedLinks = newLinks.docs.map((doc) => {
    return {
      ...doc.data(),
      docId: doc.id,
    };
  });
  console.log(transformedLinks);
  return transformedLinks;
}
export async function userSearched(searchText) {
  const response = await firebase
    .firestore()
    .collection("users")
    .orderBy("userName")
    .startAt(searchText)
    .endAt(searchText + "\uf8ff")
    .limit(5)
    .get();

  const peopleData = response.docs.map((doc) => {
    return {
      ...doc.data(),
      docId: doc.id,
    };
  });
  return peopleData;
}

export async function getRecentLinks() {
  const querySnapshot = await firebase
    .firestore()
    .collection("link")
    .orderBy("dateCreated", "desc")
    .limit(10)
    .get();

  const recentLinks = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      docId: doc.id,
    };
  });
  return recentLinks;
}
export async function getLinkByUserId(userId) {
  const response = await firebase
    .firestore()
    .collection("link")
    .where("userId", "==", userId)
    .get();

  const linkData = response.docs.map((doc) => {
    return {
      ...doc.data(),
      docId: doc.id,
    };
  });
  return linkData;
}

export async function getUserByUsername(userName) {
  const response = await firebase
    .firestore()
    .collection("users")
    .where("userName", "==", userName)
    .get();

  const userData = response.docs.map((doc) => {
    return {
      ...doc.data(),
      docId: doc.id,
    };
  });
  //   console.log(userData)
  return userData;
}

export async function addingToFavorites(userDocId, favoriteLinkDocId) {
  const response = await firebase
    .firestore()
    .collection("users")
    .doc(userDocId)
    .update({
      favorites: firebaseapp.firestore.FieldValue.arrayUnion(favoriteLinkDocId)
    });
    console.log("Successfully added to favorites")
}
