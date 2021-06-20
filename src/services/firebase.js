import firebase from "./../library/firebase";
import firebaseapp from "firebase/app";
// firebase.firestore().collection("link").where()
// https://firebase.googleblog.com/2019/11/cloud-firestore-now-supports-in-queries.html

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
export async function userLike(userDocId, linkDocId) {
  const response = await firebase
    .firestore()
    .collection("link")
    .doc(linkDocId)
    .get();
  console.log(response);
  const linkData = response.data();

  let userFound = false;
  linkData.likes.forEach((element) => {
    if (element.docId === userDocId) {
      element.likesStatus = true;
      userFound = true;
    }
  });
  if (!userFound) {
    linkData.likes.push({
      docId: userDocId,
      likesStatus: true,
    });
  }
  await firebase.firestore().collection("link").doc(linkDocId).update({
    likes: linkData.likes,
  });
  console.log("Added like");
}
export async function userDisike(userDocId, linkDocId) {
  const response = await firebase
    .firestore()
    .collection("link")
    .doc(linkDocId)
    .get();
  const linkData = response.data();
  let userFound = false;
  linkData.likes.forEach((element) => {
    if (element.docId === userDocId) {
      element.likesStatus = false;
      userFound = true;
    }
  });
  if (!userFound) {
    linkData.likes.push({
      docId: userDocId,
      likesStatus: false,
    });
  }
  await firebase.firestore().collection("link").doc(linkDocId).update({
    likes: linkData.likes,
  });
  console.log("Added dislike");
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
  await firebase
    .firestore()
    .collection("users")
    .doc(userDocId)
    .update({
      favorites: firebaseapp.firestore.FieldValue.arrayUnion(favoriteLinkDocId),
    });
  console.log("Successfully added to favorites");
}

export async function removingFromFavorites(userDocId, removeLinkDocId) {
  await firebase
    .firestore()
    .collection("users")
    .doc(userDocId)
    .update({
      favorites: firebaseapp.firestore.FieldValue.arrayRemove(removeLinkDocId),
    });
  console.log("Successfully removed from favorites");
}

export async function getUserFavorites(userFavoriteArray) {
  const batchesArray = [];
  while (userFavoriteArray.length) {
    const batch = userFavoriteArray.splice(0, 10);
    const response = await firebase
      .firestore()
      .collection("link")
      .where(firebaseapp.firestore.FieldPath.documentId(), "in", batch)
      .get();

    const batchData = response.docs.map((doc) => {
      return {
        ...doc.data(),
        docId: doc.id,
      };
    });
    batchesArray.push(...batchData);
  }
  return batchesArray;
}

// myCollection.where(firestore.FieldPath.documentId(), 'in', ["123","456","789"])
