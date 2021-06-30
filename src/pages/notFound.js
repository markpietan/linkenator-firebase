import { Header, Icon, Container } from 'semantic-ui-react'
import {Link} from "react-router-dom"
import {LANDINGPAGE} from "../constant/routes"

const notFound = () => {
 return (
    <Container textAlign="center" style= {{
        marginTop : "25%"
    }}>
    <Header as= 'h1' icon>

    <Icon name= "question"></Icon>
    Page not found
    <Header.Subheader>Looking for the home page <Link to= {LANDINGPAGE}>click here</Link></Header.Subheader>
    </Header>
    </Container>
 )
}

export default notFound
