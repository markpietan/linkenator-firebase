import firebase from "./../library/firebase";

export async function addLink(userId, link) {
  await firebase.firestore().collection("link").add({
    userId,
    link,
    dateCreated: Date.now(),
    likes: [],
  });
}

export async function getRecentLinks() {
  const querySnapshot = await firebase.firestore().collection("link").get();

  const recentLinks = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      docId: doc.id,
    };
  });
 return recentLinks
}
