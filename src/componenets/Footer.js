import { Container, Segment, List, Image, Header } from "semantic-ui-react"; 
import logo from "../logo.png"

const Footer = () => (
<Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
    <Container textAlign='center'>
    <Image centered circular size='tiny' src= {logo} />
    <List horizontal inverted divided link size='small'>
          <List.Item as='a' href='#'>
            Site Map
          </List.Item>
          <List.Item as='a' href='#'>
            Contact Us
          </List.Item>
          <List.Item as='a' href='#'>
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item>
        </List>
    </Container>
</Segment>
)

export default Footer