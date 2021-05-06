import { useSelector } from "react-redux";
import { Button, Input, Form } from "semantic-ui-react";
import { useState, useEffect } from "react";
import Post from "./Post";

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
    await addLink(loggedInUser.uid, linkText);
  }
  return (
    <section>
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
      {linkList?.map((singleLink) => {
        return (
          <Post
            key={singleLink.docId}
            userName=""
            dateCreated={singleLink.dateCreated}
            linkText={singleLink.link}
          ></Post>
        );
      })}
    </section>
  );
};

export default PostList;
