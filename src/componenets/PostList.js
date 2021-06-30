import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Input,
  Form,
  Placeholder,
  Dimmer,
  Loader,
  Radio,
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
  const [radioChoice, setradioChoice] = useState("recent");
  const [linkText, setlinkText] = useState("");
  const [linkList, setlinkList] = useState(null);
  const [pageBottom, setpageBottom] = useState(false);
  const [endOfContent, setendOfContent] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const recentLinks = await getRecentLinks();
      setlinkList(recentLinks);
    }
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const checkBottom = () => {
      if (
        endOfContent === false &&
        window.innerHeight + window.scrollY >=
          document.getElementById("root").offsetHeight - 40
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
      const moreLinks = await getNextTenLinks(
        linkList[linkList.length - 1].docId
      );
      if (moreLinks.length === 0) {
        setendOfContent(true);
      }
      setlinkList([...linkList, ...moreLinks]);
      dispatch(hideLoader());
      setpageBottom(false);
    }
    if (pageBottom === true && linkList?.length > 0) {
      getMoreLinks();
      dispatch(showLoader());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pageBottom]);

  function getNumberOfLikes(post) {
    let sum = 0;
    post.likes.forEach((element) => {
      element.likesStatus ? sum++ : sum--;
    });
    return sum;
  }

  function handleChange(e, { value }) {
    setradioChoice(value);
    let copy = linkList.slice();
    if (value === "recent") {
      copy.sort(mostRecentCompare);
    } else if (value === "liked") {
      copy.sort(mostLikedCompare);
    } else {
      copy.sort(leastLikedCompare);
    }
    setlinkList(copy)
  }
  function mostRecentCompare(a, b) {
    // a is less than b by some ordering criterion
    if (a.dateCreated < b.dateCreated) {
      return -1;
    }
    //a is greater than b by the ordering criterion
    if (a.dateCreated > b.dateCreated) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  function leastLikedCompare(a, b) {
    // a is less than b by some ordering criterion
    if (getNumberOfLikes(a) < getNumberOfLikes(b)) {
      return -1;
    }
    //a is greater than b by the ordering criterion
    if (getNumberOfLikes(a) > getNumberOfLikes(b)) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }
  function mostLikedCompare(a, b) {
    // a is less than b by some ordering criterion
    if (getNumberOfLikes(a) > getNumberOfLikes(b)) {
      return -1;
    }
    //a is greater than b by the ordering criterion
    if (getNumberOfLikes(a) < getNumberOfLikes(b)) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }
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
      <Dimmer page active={loaderVisible}>
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
      <Form id="filter">
        <Form.Field>
          <Radio
            label="Most recent links"
            name="radioGroup"
            value="recent"
            checked={radioChoice === "recent"}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="Most liked links"
            name="radioGroup"
            value="liked"
            checked={radioChoice === "liked"}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="Least recent links"
            name="radioGroup"
            value="least liked"
            checked={radioChoice === "least liked"}
            onChange={handleChange}
          />
        </Form.Field>
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
              likes={singleLink.likes}
            ></Post>
          );
        })
      )}
    </section>
  );
};

export default PostList;
