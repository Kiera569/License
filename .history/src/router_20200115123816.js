import React from "react";
import { Route, BrowserRouter:Router, Switch, Redirect } from "react-router-dom";
import Login from "./Login/login";
import Submit from "./submit/submit";
import { Divider } from "antd";

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
const BasicRoute = () => {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Submit" component={Submit} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default BasicRoute;
