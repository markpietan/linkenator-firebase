import { Header, Icon, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { LANDINGPAGE } from "../constant/routes";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = `Linkerator - Not Found`;
  }, []);
  return (
    <Container
      textAlign="center"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Header as="h1" icon>
        <Icon name="question"></Icon>
        Page not found
        <Header.Subheader>
          Looking for the home page <Link to={LANDINGPAGE}>click here</Link>
        </Header.Subheader>
      </Header>
    </Container>
  );
};

export default NotFound;
