import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../router/Home";
import Auth from "../router/Auth";
import Navigation from "./Navigation";
import Profile from "../router/Profile";

//isLoggenIn,userObj,changeName prop전달받음
const AppRouter = ({ isLoggenIn, userObj, changeName }) => {
  return (
    <Router>
      {isLoggenIn && <Navigation userObj={userObj} />}
      <Switch>
        <>
        {isLoggenIn ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} changeName={changeName} />
            </Route>
          </div>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;
