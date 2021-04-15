import React, { Suspense } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import * as ROUTES from "./constant/routes";
import { Route, Switch, BrowserRouter } from "react-router-dom";

const HOME = React.lazy(() => import("./pages/home"));
const SIGNUP = React.lazy(() => import("./pages/signup"));
const LOGIN = React.lazy(() => import("./pages/login"));

function App() {
  return (

    <BrowserRouter>
    <Suspense fallback= {<div>Loading</div>}>
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
