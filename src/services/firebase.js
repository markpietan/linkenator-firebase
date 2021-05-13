import firebase from "./../library/firebase";

export async function addLink(userId, link, userName, userPhoto) {
  const response = await firebase.firestore().collection("link").add({
    userId,
    userName,
    userPhoto,
    link,
    dateCreated: Date.now(),
    likes: [],
  });
return response.id
}

export async function getNextTenLinks(lastLinkDocID) {

}

export async function getRecentLinks() {
  const querySnapshot = await firebase.firestore().collection("link").orderBy("dateCreated","desc").limit(10)
  .get();

  const recentLinks = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      docId: doc.id,
    };
  });
 return recentLinks
}
