import React from "react";
import { Segment, Rating, Icon, Header, Image } from "semantic-ui-react";
import "./Post.css";
import { formatDistance } from "date-fns";

const Post = ({ userName, dateCreated, linkText, photoURL }) => {
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
          <p>{userName}</p>

          <Image src={photoURL} avatar />
          <Rating icon="heart" defaultRating={1} maxRating={1} />
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
