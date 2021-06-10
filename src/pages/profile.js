import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername, getLinkByUserId } from "../services/firebase";
import { useState } from "react";
import { formatDistance } from "date-fns";
import Post from "../componenets/Post";
import "./profile.css";
import {
  Container,
  Grid,
  Image,
  Header,
  Divider,
  Placeholder,
} from "semantic-ui-react";

const Profile = () => {
  const [links, setLinks] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const { userName } = useParams();
  console.log(userName)
  useEffect(() => {
    async function getUserDetails() {
      const response = await getUserByUsername(userName);

      const [userdetails] = response;
      setUserDetails(userdetails);
      const userId = userdetails.userId;

      const links = await getLinkByUserId(userId);
        setLinks(links);
    }
    getUserDetails();
  }, [userName]);

  useEffect(()=>{
 document.title= `Linkerator - ${userName}`
  },[])
  return (
    <Container>
      <Grid columns="equal" divided id="headerGrid">
        <Grid.Column>
          <Image src={userDetails?.photoURL}></Image>
        </Grid.Column>
        <Grid.Column>
          <div className="center">
            <Header as="h1">{userDetails?.userName}</Header>
            <Header as="h2">{links?.length} lengths created</Header>
          </div>
        </Grid.Column>

        <Grid.Column>
          <div className="center">
            <Header as="h2">
              {userDetails?.dateCreated &&
                formatDistance(userDetails?.dateCreated, Date.now())}{" "}
              ago
            </Header>
          </div>
        </Grid.Column>
      </Grid>
      <Divider></Divider>
      <Grid id="linkGrid" centered>
        <Grid.Column>
          {links === null ? (
            <div className="center">
              {[1, 1, 1, 1].map(() => {
                return <Placeholder className="placeHolder"></Placeholder>;
              })}
            </div>
          ) : (
            <div className="center">
              {links?.map((e) => {
                return (
                  <Post
                    key={e.docId}
                    docId={e.docId}
                    userName={e.userName.toLowerCase()}
                    dateCreated={e.dateCreated}
                    photoURL={e.userPhoto}
                    linkText={e.link}
                  ></Post>
                );
              })}
            </div>
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Profile;
