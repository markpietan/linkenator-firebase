import { useState, useEffect, useCallback } from "react";
import {
  Segment,
  Rating,
  Icon,
  Header,
  Image,
  Statistic,
} from "semantic-ui-react";
import "./Post.css";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import {
  addingToFavorites,
  removingFromFavorites,
  userLike,
  userDisike,
} from "../services/firebase";
import { useSelector } from "react-redux";

const Post = ({ userName, dateCreated, linkText, photoURL, docId, likes }) => {
  const user = useSelector((store) => {
    return store?.userLoggedIN.user;
  });
  const [isFavorited, setisFavorited] = useState(
    user?.favorites?.includes(docId)
  );
  const [loading, setLoading] = useState(false);

  const [userLiked, setuserLiked] = useState(null);
  const [numberOfLikes, setnumberOfLikes] = useState(0);
  useEffect(() => {
    getTotalNumberOfLikes();
    getUserLikes();
  }, [user, getTotalNumberOfLikes, getUserLikes]);

  useEffect(() => {
    setisFavorited(user?.favorites?.includes(docId));
  }, [user, docId]);
  const usersDocId = user?.docId;
  async function onRate() {
    if (isFavorited) {
       await removingFromFavorites(usersDocId, docId);
      setisFavorited(false);
    } else {
      await addingToFavorites(usersDocId, docId);
      setisFavorited(true);
    }
  }
  async function onLike() {
    setLoading(true);
     await userLike(usersDocId, docId);
    updateUserVote(true);
    setLoading(false);
  }
  async function onDislike() {
    setLoading(true);
     await userDisike(usersDocId, docId);

    updateUserVote(false);
    setLoading(false);
  }
  function updateUserVote(voteBoolean) {
    let userFound = false
    likes.forEach((element) => {
      if (element.docId === usersDocId) {
        element.likesStatus = voteBoolean;
        userFound = true
      } 
    });
    if (!userFound) {
      likes.push({ docId: usersDocId, likesStatus: voteBoolean });
    }
    getTotalNumberOfLikes();
    getUserLikes();
  }
  const getTotalOfLikes setCallback
  function getTotalNumberOfLikes() {
    let sum = 0;
    likes.forEach((element) => {
      element.likesStatus ? sum++ : sum--;
    });
    setnumberOfLikes(sum);
  }
  function getUserLikes() {
    likes.forEach((element) => {
      if (element.docId === usersDocId) {
        element.likesStatus ? setuserLiked(true) : setuserLiked(false);
      }
    });
  }
  let upVoteColor = userLiked === false ? "grey" : "red";
  let downVoteColor = userLiked === true ? "grey" : "red";
  if (userLiked === null) {
    upVoteColor = "grey";
    downVoteColor = "grey";
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
          <Rating
           disabled={user === null ? true : false}
            onRate={onRate}
            icon="heart"
            maxRating={1}
            rating={isFavorited ? 1 : 0}
          />
        </div>
        <div className="post_rating">
          <p>{formatDistance(dateCreated, Date.now())} ago</p>
          <Statistic color="green" size="mini">
            <Statistic.Value>{numberOfLikes}</Statistic.Value>
            <Statistic.Label>Like Status</Statistic.Label>
          </Statistic>
          <div>
            <Icon
              onClick={() => {
                onLike();
              }}
              name={loading ? "spinner" : "arrow alternate circle up"}
              color={upVoteColor}
              loading={loading}
              disabled={loading || user === null ? true : false}
            ></Icon>
            <Icon
              onClick={() => {
                onDislike();
              }}
              name={loading ? "spinner" : "arrow alternate circle down"}
              color={downVoteColor}
              loading={loading}
              disabled={loading || user === null ? true : false}
            ></Icon>
          </div>
        </div>
      </Segment>
    </>
  );
};

export default Post;
// link {
//   userId,
//   dateCreated,
//   link,
//   userName,
//   userPhoto,
//   likes: [
//     {
//       docId: docId,
//       likeStatus: false|true
//     }
//   ]
// }
