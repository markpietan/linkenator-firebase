import {Button} from "semantic-ui-react"
import {useSelector} from 'react-redux'

const Home = () => {
  const db = useSelector((state) => {
    return state.firebase.db;
  });
  return <div>
      <Button onClick= {() => {
          db.auth().signOut()
      }}>Sign Out</Button>
  </div>;
};

export default Home;
