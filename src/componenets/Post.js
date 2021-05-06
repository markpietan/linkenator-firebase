import React from "react";
import { Segment, Rating, Icon, Header } from "semantic-ui-react";
import "./Post.css";

const Post = ({userName, dateCreated, linkText}) => {
  return (
    <>
      <Segment className="post" size="tiny" padded>
        <Header className="post_header">
          {" "}
          <a target= "_blank" rel="noreferrer" href={linkText}>
         {linkText}
          </a>
        </Header>

        <div className="post_like">
          <p>{userName}</p>
          <Rating icon="heart" defaultRating={1} maxRating={1} />
        </div>
        <div className="post_rating">
          <p>{dateCreated}</p>
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
