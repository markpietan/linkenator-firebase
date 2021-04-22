import React, { Suspense } from "react";
import useAuth from "./Hooks/useAuth"
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import * as ROUTES from "./constant/routes";
import 'semantic-ui-css/semantic.min.css'
import { Route, Switch, BrowserRouter } from "react-router-dom";
import NavBar from "./../src/componenets/NavBar"

const HOME = React.lazy(() => import("./pages/home"));
const SIGNUP = React.lazy(() => import("./pages/signup"));
const LOGIN = React.lazy(() => import("./pages/login"));

function App() {
  useAuth()
  return (

    <BrowserRouter>
    <Suspense fallback= {<div>Loading</div>}>
      <NavBar></NavBar>
      <Switch>
      <Route exact path={ROUTES.SIGN_UP}>
        <SIGNUP></SIGNUP>
      </Route>
      <Route exact path={ROUTES.LOG_IN}>
        <LOGIN></LOGIN>
      </Route>
      <Route exact path={ROUTES.HOME}>
        <HOME></HOME>
      </Route>
      </Switch> 
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
