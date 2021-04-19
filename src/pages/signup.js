import React, { useState } from "react";
import { Button, Form, Icon, Grid, Header, Segment } from "semantic-ui-react";
import { useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import {LOG_IN} from "./../constant/routes"
import firebase  from "../library/firebase";
import LOGIN from "./login";

const SIGNUP = () => {
  const [userName, setuserName] = useState("");
  const [passWord, setpassWord] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory()
  const db = useSelector((state) => {
    return state.firebase.db;
  });
  console.log(db);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdUser = await db
        .auth()
        .createUserWithEmailAndPassword(email, passWord);
      await createdUser.user.updateProfile({
        displayName: userName,
        photoURL: "https://www.computerhope.com/jargon/g/guest-user.jpg",
      });
      await db.firestore().collection("users").add({
        userName: userName,
        email: email,
        userId: createdUser.user.uid,
        photoURL: "https://www.computerhope.com/jargon/g/guest-user.jpg",
        dateCreated: Date.now(),
      });
      console.log("User successfully created an Account");
      history.push(LOGIN)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column mobile="10" style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Icon name="user"></Icon>
        </Header>
        <Form onSubmit= {onSubmit}>
          <Segment stacked>
            <label htmlFor="e-mail">Sign-Up</label>

            <Form.Input
              required
              id="e-mail"
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Input
              required
              id="password"
              minLength="5"
              type="password"
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              value={passWord}
              onChange={(e) => {
                setpassWord(e.target.value);
              }}
            />
            <Form.Input
              required
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              type="username"
              value={userName}
              onChange={(e) => {
                setuserName(e.target.value);
              }}
            />
            <Button color="teal" fluid size="large">
              Sign Up
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default SIGNUP;

/* 
users collection
{username: 
email:
userId:
profileImage:  
dateCreated: 
}


links collection
{
 name:
 userId:
 likes:
 comments:

}


*/
