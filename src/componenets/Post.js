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
  const [userLiked, setuserLiked] = useState(null);
  const [numberOfLikes, setnumberOfLikes] = useState(0);
  useEffect(() => {
    getTotalNumberOfLikes();
    getUserLikes();
  }, []);

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
    const response = await userLike(usersDocId, docId);
  }
  async function onDislike() {
    const response = await userDisike(usersDocId, docId);
  }

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
              name="arrow alternate circle up"
              color={userLike === null ? "grey" : userLike === true ? "red": "grey"}
            ></Icon>
            <Icon
              onClick={() => {
                onDislike();
              }}
              name="arrow alternate circle down"
              color={userLike !== null  && userLike === false ? "red" : "grey"}
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
