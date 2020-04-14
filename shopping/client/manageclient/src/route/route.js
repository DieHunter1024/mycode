import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import RouteList from "../config/routeList";
import Login from "../page/login/login";
import Home from "../page/home/home";
import NotFind from "../page/errpage/404";
export default class RoutrModel extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="login"></Redirect>
          </Route>
          <Route path="/login" component={Login}></Route>
          <Route exact path="/admin">
            <Redirect to="/admin/shopList"></Redirect>
          </Route>
          <Route
            path="/admin"
            render={props => {
              return (
                <Home {...props}>
                  <Switch>
                    {this.createRoute()}
                    <Route component={NotFind}></Route>
                  </Switch>
                </Home>
              );
            }}
          ></Route>
          <Route component={NotFind}></Route>
        </Switch>
      </Router>
    );
  }
  createRoute = props => {
    return RouteList.leftMenu.map(item => {
      return (
        <Route path={item.route} component={item.comp} key={item.route}></Route>
      );
    });
  };
}
