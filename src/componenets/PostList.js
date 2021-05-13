import { useSelector } from "react-redux";
import { Button, Input, Form, Placeholder } from "semantic-ui-react";
import { useState, useEffect } from "react";
import Post from "./Post";
import "./PostList.css";

import { addLink, getRecentLinks, getNextTenLinks } from "./../services/firebase";

const PostList = () => {
  const loggedInUser = useSelector((store) => {
    return store.userLoggedIN.user;
  });
  const [linkText, setlinkText] = useState("");
  const [linkList, setlinkList] = useState(null);
  const [pageBottom, setpageBottom] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const recentLinks = await getRecentLinks();
      setlinkList(recentLinks);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const checkBottom = () => {
      console.log("scroll");
      if (
        window.innerHeight + window.scrollY >=
        document.getElementById("root").offsetHeight
      ) {
        setpageBottom(true);
      }
    };
    window.addEventListener("scroll", checkBottom);
    return () => {
      window.removeEventListener("scroll", checkBottom);
    };
  }, []);

  useEffect(()=> {
   async function getMoreLinks() {
    getNextTenLinks(linkList[linkList.length-1].docId)
   }
   if (pageBottom) {
     getMoreLinks()
   }
  },[pageBottom])

  async function onsubmit() {
    const docId = await addLink(
      loggedInUser.uid,
      linkText,
      loggedInUser.displayName,
      loggedInUser.photoURL
    );
    setlinkList([
      {
        userId: loggedInUser.uid,
        userName: loggedInUser.displayName,
        dateCreated: Date.now(),
        link: linkText,
        docId,
      },
      ...linkList,
    ]);
  }
  return (
    <section id="postList">
      <Form
        onSubmit={(e) => {
          onsubmit();
        }}
      >
        <Input
          onChange={(e) => {
            setlinkText(e.target.value);
          }}
          value={linkText}
          type="text"
          required
        ></Input>
        <Button type="submit">Add link</Button>
      </Form>
      {linkList === null ? (
        <>
          {" "}
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => {
            return <Placeholder className="placeHolder"></Placeholder>;
          })}
        </>
      ) : (
        linkList.map((singleLink) => {
          return (
            <Post
              key={singleLink.docId}
              userName={singleLink.userName}
              dateCreated={singleLink.dateCreated}
              linkText={singleLink.link}
              photoURL={singleLink.userPhoto}
            ></Post>
          );
        })
      )}
    </section>
  );
};

export default PostList;
