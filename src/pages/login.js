import React, { useState } from "react";

import { Button, Form, Icon, Grid, Header, Segment } from "semantic-ui-react";
import { useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import {HOME} from "./../constant/routes"


const LOGIN = () => {
  const [passWord, setpassWord] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory()
 
  const db = useSelector((state) => {
    return state.firebase.db;
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.auth().signInWithEmailAndPassword(email, passWord);
      history.push(HOME)
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
        <Form onSubmit={onSubmit}>
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

            <Button type= "submit" color="teal" fluid size="large">
              Sign Up
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default LOGIN;

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
