import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
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

function PrivateRoute({ children, ...rest }) {
  return (
    // <Route exact path="/" component={Login} />
    <Route
      {...rest}
      render={props =>
        Boolean(sessionStorage.getItem("isLogin")) ? (
          children
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
            <PrivateRoute exact path="/" />
            <PrivateRoute exact path="/Submit" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default BasicRoute;
