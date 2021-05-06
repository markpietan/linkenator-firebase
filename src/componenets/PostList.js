import { useSelector } from "react-redux";
import { Button, Input, Form, Placeholder } from "semantic-ui-react";
import { useState, useEffect } from "react";
import Post from "./Post";
import "./PostList.css";

import { addLink, getRecentLinks } from "./../services/firebase";

const PostList = () => {
  const loggedInUser = useSelector((store) => {
    return store.userLoggedIN.user;
  });
  const [linkText, setlinkText] = useState("");
  const [linkList, setlinkList] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const recentLinks = await getRecentLinks();
      setlinkList(recentLinks);
    }
    fetchData();
  }, []);

  async function onsubmit() {
    const docId = await addLink(
      loggedInUser.uid,
      linkText,
      loggedInUser.displayName
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
            ></Post>
          );
        })
      )}
    </section>
  );
};

export default PostList;
