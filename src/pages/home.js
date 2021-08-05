import PostList from "../componenets/PostList";
import { useEffect } from "react";


const Home = () => {
  useEffect(() => {
    document.title = `Linkerator - Dashboard`;
  }, [])
  return (
    <main>
      <PostList></PostList>
    </main>
  );
};

export default Home;
