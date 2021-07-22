import {
  Button,
  Container,
  Image,
  Header,
  Segment,
  Ref,
  Item,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Feature from "../componenets/Feature";
import heroImage from "../undraw_Push_notifications_re_t84m.svg";
import "./landingpage.css";
import * as ROUTES from "../constant/routes";

const LANDINGPAGE = () => {
  return (
    <Container as="main" className="landingPage" fluid>
      <div id="hero">
        <div className="heroContents">
          <Header as="h1" className="heroTitle">
            Linkenator
          </Header>
          <Header as="h3">
            Share your favorite links from across the web!
          </Header>
          <Link to={ROUTES.SIGN_UP}>
            <Button className="ctaButton" primary>
              Sign up Today
            </Button>
          </Link>
        </div>
        <Image className="heroImage" src={heroImage}></Image>
      </div>
      <Container id="featureSection" as="section">
        <Feature></Feature>
        <Feature></Feature>
        <Feature></Feature>
      </Container>
    </Container>
  );
};
export default LANDINGPAGE;
