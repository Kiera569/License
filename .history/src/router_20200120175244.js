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

const routes = [
  {
    path: "/"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/submit",
    componnet: Submit,
    routes: [
      {
        path: "/codeManage",
        component: LicenseList
      },
      {
        path: "/projectManage",
        component: LicenseList
      }
    ]
  }
];
// () => {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/login" component={Login} />
//         <Route
//           path="/"
//           render={() =>
//             sessionStorage.getItem("isLogin") ? (
//               <Submit />
//             ) : (
//               <Redirect to="/login" />
//             )
//           }
//         />
//         <Route
//           path="/submit"
//           component={Submit}
//           routes={[
//             // { path: "/codeManage", component: { LicenseList } },
//             { path: "/userManage", component: { LicenseList } },
//             { path: "/projectManage", component: { LicenseList } }
//           ]}
//         ></Route>
//       </Switch>
//     </Router>
//   );
// };

export default routes;
export default function RouteConfig() {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => {
          <RouteWithSubRoutes key={i} {...route} />;
        })}
      </Switch>
    </Router>
  );
}
function RouteWithSubRoutes(routes) {
  return (
    <Route
      path={routes.path}
      render={props => <route.component {...props} routes={routes.routes} />}
    />
  );
}
