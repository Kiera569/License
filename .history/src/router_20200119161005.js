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
              pathname: "/",
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
        {/* <Route path="/login" component={Login} />
        <Route
          path="/"
          render={() =>
            sessionStorage.getItem("isLogin") ? (
              <Submit />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route path="/submit" component={Submit} /> */}

        <PrivateRoute exact path="//ogin">
          <Login />
        </PrivateRoute>
        <PrivateRoute exact path="/submit">
          <Submit />
          <Route exact path="/submit/licenseList">
            <LicenseList />
          </Route>
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default BasicRoute;
