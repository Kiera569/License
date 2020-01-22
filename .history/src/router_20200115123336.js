import React from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import Login from "./Login/login";
import Submit from "./submit/submit";

// const BasicRoute = () => (
//   <HashRouter>
//     <Switch>
//       <Route exact path="/" component={Login} />
//       <Route exact path="/Submit" component={Submit} />
//     </Switch>
//   </HashRouter>
// );
// export default BasicRoute;

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Boolean(sessionStorage.getItem("isLogin")) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
const BasicRoute = ({ component: Component, ...rest }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Submit" component={Submit} />
      </Switch>
    </Router>
  );
};

export default BasicRoute;
