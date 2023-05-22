import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AnimatePresence } from "framer-motion";
import AdminPanal from "../routes/AdminPanal"


const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  //console.log(userObj);
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} refreshUser={refreshUser} />}
      <Switch>
      <AnimatePresence>
        <>
          {isLoggedIn ? (
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
                <Home userObj={userObj} refreshUser={refreshUser} />
              </Route>
              <Route exact path="/Profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
            </div>
          ) : (
            <Route exact path="/">
              <Auth />
            </Route>
          )}
        </>
        <Route exact path="/admin">
              <AdminPanal />
            </Route>
        </AnimatePresence>
      </Switch>
    </Router>
  );
};

export default AppRouter;
