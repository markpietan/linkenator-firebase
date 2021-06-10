import React from "react";
import { Segment, Rating, Icon, Header, Image } from "semantic-ui-react";
import "./Post.css";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { addingToFavorites } from "../services/firebase";
import { useSelector } from "react-redux";

const Post = ({ userName, dateCreated, linkText, photoURL, docId }) => {
  console.log("rerender")
  const usersDocId = useSelector((store) => {
    console.log(store)
    return store?.userLoggedIN.user?.docId;
  });
  async function onRate() {
    console.log(usersDocId, docId)
    const response = await addingToFavorites(usersDocId, docId)
  }
  return (
    <>
      <Segment className="post" size="tiny" padded>
        <Header className="post_header">
          {" "}
          <a target="_blank" rel="noreferrer" href={linkText}>
            {linkText}
          </a>
        </Header>

        <div className="post_like">
          <Link to={`/profile/${userName}`}>
            <p>{userName}</p>
          </Link>
          <Link to={`/profile/${userName}`}>
            <Image src={photoURL} avatar />
          </Link>
          <Rating onRate={onRate} icon="heart" defaultRating={0} maxRating={1} />
        </div>
        <div className="post_rating">
          <p>{formatDistance(dateCreated, Date.now())} ago</p>
          <div>
            <Icon name="angle up"></Icon>
            <Icon name="angle down"></Icon>
          </div>
        </div>
      </Segment>
    </>
  );
};

export default Post;
