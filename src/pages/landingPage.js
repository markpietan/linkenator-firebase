import { Button, Container, Image, Header, Segment, Item } from "semantic-ui-react";
import heroImage from "../undraw_Push_notifications_re_t84m.svg";
import "./landingpage.css";
const square = { width: 275, height: 275 };

const LANDINGPAGE = () => {
  return (
    <Container as="main" className="landingPage" fluid>
      <div id="hero">
        <div>
          <Header as="h1" className="heroTitle">
            Linkenator
          </Header>
          <Header as="h3">
            Share your favorite links from across the web!
          </Header>
          <Button className="ctaButton" primary>
            Sign up Today
          </Button>
        </div>
        <Image className="heroImage" src={heroImage}></Image>
      </div>
      <Container id="featureSection" as="section">
        <Segment circular style={square} className="feature">
          <Header as="h2" className="featureTitle">
            Post links
            <Header.Subheader className="featureSubtitle">
              post any link on your account from any site on the web!
            </Header.Subheader>
          </Header>
        </Segment>
        <Segment circular style={square} className="feature">
          <Header as="h2" className="featureTitle">
            Post links
            <Header.Subheader className="featureSubtitle">
              post any link on your account from any site on the web!
            </Header.Subheader>
          </Header>
        </Segment>
        <Segment circular style={square} className="feature">
          <Header as="h2" className="featureTitle">
            Post links
            <Header.Subheader className="featureSubtitle">
              post any link on your account from any site on the web!
            </Header.Subheader>
          </Header>
        </Segment>
      </Container>
    </Container>
  );
};
export default LANDINGPAGE;
