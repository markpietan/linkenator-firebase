import { useState, useEffect } from "react";
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
    console.log(store);
    return store?.userLoggedIN.user;
  });
  console.log(likes);
  const [isFavorited, setisFavorited] = useState(
    user?.favorites?.includes(docId)
  );
  const [loading, setLoading] = useState(false);

  const [userLiked, setuserLiked] = useState(null);
  const [numberOfLikes, setnumberOfLikes] = useState(0);
  useEffect(() => {
    getTotalNumberOfLikes();
    getUserLikes();
  }, [user]);

  useEffect(() => {
    setisFavorited(user?.favorites?.includes(docId));
  }, [user]);
  const usersDocId = user?.docId;
  async function onRate() {
    console.log(usersDocId, docId);
    if (isFavorited) {
      const response = await removingFromFavorites(usersDocId, docId);
      setisFavorited(false);
    } else {
      const response = await addingToFavorites(usersDocId, docId);
      setisFavorited(true);
    }
  }
  async function onLike() {
    setLoading(true);
    const response = await userLike(usersDocId, docId);
    updateUserVote(true);
    setLoading(false);
  }
  async function onDislike() {
    setLoading(true);
    const response = await userDisike(usersDocId, docId);

    updateUserVote(false);
    setLoading(false);
  }
  function updateUserVote(voteBoolean) {
    let userFound = false
    likes.forEach((element) => {
      if (element.docId === usersDocId) {
        element.likesStatus = voteBoolean;
        console.log("updated likes status");
        userFound = true
      } 
    });
    if (!userFound) {
      likes.push({ docId: usersDocId, likesStatus: voteBoolean });
      console.log("added new vote");
    }
    console.log({ likes });
    getTotalNumberOfLikes();
    getUserLikes();
  }
  function getTotalNumberOfLikes() {
    let sum = 0;
    likes.forEach((element) => {
      element.likesStatus ? sum++ : sum--;
    });
    setnumberOfLikes(sum);
  }
  function getUserLikes() {
    console.log({likes})
    console.log({usersDocId})
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
    console.log("Hello, inside if statement");
  }
  console.log(upVoteColor);
  console.log(downVoteColor);
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
              disabled={loading}
            ></Icon>
            <Icon
              onClick={() => {
                onDislike();
              }}
              name={loading ? "spinner" : "arrow alternate circle down"}
              color={downVoteColor}
              loading={loading}
              disabled={loading}
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
