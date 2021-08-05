import { Container, Segment, List, Image, Header } from "semantic-ui-react";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import * as ROUTES from "../constant/routes";

const Footer = () => (
  <Segment
    inverted
    vertical
    style={{ margin: "2.5em 0em 0em", padding: "2.5em 0em" }}
  >
    <Container textAlign="center">
      <Image centered circular size="tiny" src={logo} />
      <List bulleted horizontal inverted link size="small">
        <Link to={ROUTES.LANDINGPAGE}>
          <List.Item as="li">Home</List.Item>
        </Link>
        <Link to={ROUTES.HOME}>
          <List.Item as="li">Dashboard</List.Item>
        </Link>
        <Link to={ROUTES.LOG_IN}>
          <List.Item as="li">Log-in</List.Item>
        </Link>
        <Link to={ROUTES.SIGN_UP}>
          <List.Item as="li">Sign-up</List.Item>
        </Link>
      </List>
    </Container>
  </Segment>
);

export default Footer;
