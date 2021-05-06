import { Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Post from "./../../src/componenets/Post";
import PostList from "../componenets/PostList"

const Home = () => {
  const db = useSelector((state) => {
    return state.firebase.db;
  });
  return (
    <main >
     <PostList></PostList>
      
    </main>
  );
};

export default Home;
