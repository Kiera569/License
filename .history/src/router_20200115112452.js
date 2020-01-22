import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
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

const BasicRoute = ({ component: Component, ...rest }) => (
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
export default BasicRoute;
