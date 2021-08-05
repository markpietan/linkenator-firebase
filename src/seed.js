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

const randomLinks = [
  "https://google.com",
  "https://facebook.com",
  "https://bing.com",
  "https://instagram.com",
  "https://gmail.com",
];

export const seedDateBase = async (firebase) => {
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
      for (let index2 = 0; index2 < 4; index2++) {
        const randomIndex = Math.floor(Math.random() * randomLinks.length);
        const randomLink = randomLinks[randomIndex];
        await firebase.firestore().collection("link").add({
          userId: index,
          userName: element.userName,
          link: randomLink,
          dateCreated: Date.now(),
          likes: [],
          userPhoto: element.photoURL,
        });
      }
    }
  } catch (error) {
  }
};
