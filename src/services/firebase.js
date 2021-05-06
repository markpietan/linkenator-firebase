import firebase from "./../library/firebase";

export async function addLink(userId, link, userName) {
  const response = await firebase.firestore().collection("link").add({
    userId,
    userName,
    link,
    dateCreated: Date.now(),
    likes: [],
  });
return response.id
}

export async function getRecentLinks() {
  const querySnapshot = await firebase.firestore().collection("link").orderBy("dateCreated","desc")
  .get();

  const recentLinks = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      docId: doc.id,
    };
  });
 return recentLinks
}
