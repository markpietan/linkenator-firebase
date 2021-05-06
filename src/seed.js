import firebase from "./library/firebase";

const peopleArray = [
  {
    photoURL: "https://randomuser.me/api/portraits/men/17.jpg",
    userName: "Bill_Hills",
    email: "123456@test.com",
  },
  {
    photoURL: "https://randomuser.me/api/portraits/women/20.jpg",

    userName: "Jill_Hills",
    email: "123456@test.com",
  },
  {
    photoURL: "https://randomuser.me/api/portraits/men/10.jpg",
    userName: "Hank_Hills",
    email: "123456@test.com",
  },
  {
    photoURL: "https://randomuser.me/api/portraits/women/17.jpg",
    userName: "Nancy_Hills",
    email: "123456@test.com",
  },
];

const randomLinks = ["www.google.com", "www.facebook.com", "www.bing.com", "www.instagram.com", "www.gmail.com"]

const seedDateBase = async () => {
  try {
      for (let index = 0; index < peopleArray.length; index++) {
          const element = peopleArray[index];
          await firebase.firestore().collection("users").add({
            userName: element.userName,
            email: element.email,
            userId: index,
            photoURL: element.photoURL,
            dateCreated: Date.now(),
          });
          await firebase.firestore().collection("link").add({
            userId: index,
            userName: element.userName,
            link: 
            dateCreated: Date.now(),
            likes: [],
          });
      }
  } catch (error) {
    console.log(error);
  }
};
