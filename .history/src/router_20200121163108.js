import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import Login from "./Login/login";
import Submit from "./submit/submit";
// import LicenseList from "./component/LicenseList/LicenseList";
// import UserManage from "./component/userManage/userManage";
// import ProjectManage from "./component/projectManage/projectManage";

const routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} exact />
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
        
          <Route path="/login" component={Login}></Route>
          <Route path="/submit" component={Submit}>
            {/* <Route path="/submit/licenseList" component={LicenseList} />
            <Route path="/submit/userManage" component={UserManage} />
            <Route path="/submit/projectManage" component={ProjectManage} /> */}
          </Route>
      
      </Switch>
    </Router>
  );
};

export default routes;
