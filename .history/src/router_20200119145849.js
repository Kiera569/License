import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import Login from "./Login/login";
import Submit from "./submit/submit";
import LicenseList from "./component/LicenseList";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        sessionStorage.getItem("isLogin") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
const BasicRoute = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/">
          <Login />
        </PrivateRoute>
        <PrivateRoute exact path="/Submit" render={()=><Submit>
<Route></Route></Route>        </Submit>}>
          <Submit />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default BasicRoute;
