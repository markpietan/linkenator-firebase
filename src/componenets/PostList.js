import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Input,
  Form,
  Placeholder,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { useState, useEffect } from "react";
import Post from "./Post";
import "./PostList.css";
import { hideLoader, showLoader } from "../features/loader/loaderslice";

import {
  addLink,
  getRecentLinks,
  getNextTenLinks,
} from "./../services/firebase";

const PostList = () => {
  const loggedInUser = useSelector((store) => {
    return store.userLoggedIN.user;
  });
  const loaderVisible = useSelector((store) => {
    return store.loader.visible;
  });
  const [linkText, setlinkText] = useState("");
  const [linkList, setlinkList] = useState(null);
  const [pageBottom, setpageBottom] = useState(false);
  const [endOfContent, setendOfContent] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const recentLinks = await getRecentLinks();
      setlinkList(recentLinks);
    }
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0,0)
  },[])

  useEffect(() => {
    const checkBottom = () => {
      console.log( document.getElementById("root").offsetHeight)
      if (
        endOfContent === false && 
        window.innerHeight + window.scrollY >=
        document.getElementById("root").offsetHeight -40
      ) {
        setpageBottom(true);
      }
    };
    window.addEventListener("scroll", checkBottom);
    return () => {
      window.removeEventListener("scroll", checkBottom);
    };
  }, [endOfContent]);

  useEffect(() => {
    async function getMoreLinks() {
      const moreLinks = await getNextTenLinks(linkList[linkList.length - 1].docId);
      if (moreLinks.length === 0) {
        setendOfContent(true)
      }
      setlinkList([...linkList,...moreLinks])
      dispatch(hideLoader())
      setpageBottom(false)
    }
    if (pageBottom === true && linkList?.length > 0) {
      getMoreLinks();
      console.log("reached page bottom");
      dispatch(showLoader());
    }
  }, [pageBottom]);

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
      <Dimmer page active = {loaderVisible}>
        <Loader />
      </Dimmer>

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
              docId={singleLink.docId}
              userName={singleLink.userName.toLowerCase()}
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
