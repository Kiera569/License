// import React from "react";
// import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
// import Login from "./Login/login";
// import Submit from "./submit/submit";

// const BasicRoute = () => (
//   <HashRouter>
//     <Switch>
//       <Route exact path="/" component={Login} />
//       <Route exact path="/Submit" component={Submit} />
//     </Switch>
//   </HashRouter>
// );

// export default BasicRoute;
import React from "react";
import { Redirect, Route, Router } from "react-router-dom";
import Login from "./Login/login";
import Submit from "./submit/submit";
import { Switch } from "antd";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
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

const BasicRoute = ({ component: Component, ...rest }) => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Login} />
        <PrivateRoute exact path="/Submit" component={Submit} />
      </Switch>
    </Router>
  );
};
// <Route
//   {...rest}
//   render={props =>
//     Boolean(sessionStorage.getItem("isLogin")) ? (
//       <Component {...props} />
//     ) : (
//       <Redirect
//         to={{
//           pathname: "/",
//           state: { from: props.location }
//         }}
//       />
//     )
//   }
// />

export { BasicRoute };
