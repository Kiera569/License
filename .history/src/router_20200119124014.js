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
  render(){
    let LayoutRouter = (
      <MyLayout>
        <Switch>
          <Route exact path="/Submit" Component={Submit} />
          <Route path="/article/list" Component={ArticleList} />
          <Route path="/article/new" Component={NewArticle} />
        </Switch>
      </MyLayout>

  
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/">
          <Login />
        </PrivateRoute>
        <PrivateRoute exact path="/Submit" render={props => LicenseList}>
          <Submit />

        </PrivateRoute>
        <PrivateRoute exact path="/LicenseList">
          <LicenseList />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};
}

export default BasicRoute;
