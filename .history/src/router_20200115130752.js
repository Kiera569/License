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

// function PrivateRoute({ children, ...rest }) {
//   return (
//     <Route
//       // {...rest}
//       render={props =>
//         sessionStorage.getItem("isLogin") ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

function PrivateRoute({ children, ...rest }) {
  console.log(111);
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
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/">
              <Login />
            </PrivateRoute>
            <PrivateRoute exact path="/Submit">
              <Submit />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default BasicRoute;
