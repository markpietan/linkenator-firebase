import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getUserByUsername,
  getLinkByUserId,
  getUserFavorites,
} from "../services/firebase";
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
  Step,
  Icon,
} from "semantic-ui-react";

const Profile = () => {
  const [links, setLinks] = useState(null);
  const [favoriteLinks, setfavoriteLinks] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const { userName } = useParams();
  const [pageNumber, setpageNumber] = useState(0);
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
  useEffect(() => {
    async function getUserFavoritedLinks() {
      const response = await getUserFavorites(userDetails.favorites);
      setfavoriteLinks(response);
    }

    if (userDetails) {
      getUserFavoritedLinks();
    }
  }, [userName, userDetails]);
  useEffect(() => {
    document.title = `Linkerator - ${userName}`;
  }, [userName]);
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
      <div className= "steps">
        <Step.Group>
          <Step
            active={pageNumber === 0}
            onClick={() => {
              setpageNumber(0);
            }}
          >
            <Icon name="linkify" />
            <Step.Content>
              <Step.Title>User's Links</Step.Title>
              <Step.Description>Links made by {userName}</Step.Description>
            </Step.Content>
          </Step>
          <Step
            active={pageNumber === 1}
            onClick={() => {
              setpageNumber(1);
            }}
          >
            <Icon name="heart" />
            <Step.Content>
              <Step.Title>User's Favorite Links</Step.Title>
              <Step.Description>Links favorited by {userName}</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
      </div>
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
              {pageNumber === 0
                ? links?.map((e) => {
                    return (
                      <Post
                        key={e.docId}
                        docId={e.docId}
                        userName={e.userName.toLowerCase()}
                        dateCreated={e.dateCreated}
                        photoURL={e.userPhoto}
                        linkText={e.link}
                        likes={e.likes}
                      ></Post>
                    );
                  })
                : favoriteLinks?.map((e) => {
                    return (
                      <Post
                        key={e.docId}
                        docId={e.docId}
                        userName={e.userName.toLowerCase()}
                        dateCreated={e.dateCreated}
                        photoURL={e.userPhoto}
                        linkText={e.link}
                        likes={e.likes}
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
