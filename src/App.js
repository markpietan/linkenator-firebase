import React, { Suspense } from "react";
import useAuth from "./Hooks/useAuth";
import "semantic-ui-css/semantic.min.css";

import "./App.css";
import * as ROUTES from "./constant/routes";

import { Route, Switch, BrowserRouter } from "react-router-dom";
import {Loader} from "semantic-ui-react"
import NavBar from "./../src/componenets/NavBar";

const HOME = React.lazy(() => import("./pages/home"));
const LANDINGPAGE = React.lazy(() => import("./pages/landingPage"));
const SIGNUP = React.lazy(() => import("./pages/signup"));
const LOGIN = React.lazy(() => import("./pages/login"));
const PROFILE = React.lazy(() => import("./pages/profile"));

function App() {
  useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader></Loader>}>
        <NavBar></NavBar>
        <Switch>
          <Route exact path={ROUTES.SIGN_UP}>
            <SIGNUP></SIGNUP>
          </Route>
          <Route exact path={ROUTES.LOG_IN}>
            <LOGIN></LOGIN>
          </Route>
          <Route exact path={ROUTES.LANDINGPAGE}>
            <LANDINGPAGE></LANDINGPAGE>
          </Route>
          <Route exact path={ROUTES.HOME}>
            <HOME></HOME>
          </Route>
          <Route exact path={ROUTES.PROFILE}>
            <PROFILE></PROFILE>
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
