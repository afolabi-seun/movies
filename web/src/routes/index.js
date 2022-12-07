import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "../components/landing/Landing";
import MovieDetail from "../components/movie/MovieDetail";
import ManageMovie from "../components/movie/ManageMovie";
export const RoutedContent = () => {
  return (
    <Switch>
      {/* ROOT PATH */}
      <Route path="/" component={ManageMovie} exact />
      <Route path="/landing" component={Landing} exact />

      {/* USER */}
      {/* <RouteGuard path="/user-list" component={ManageUser} exact /> */}
      {/* <RouteGuard path="/comment-list" component={ManageUser} exact /> */}

      {/* MOVIE */}
      <Route path="/movie-detail" component={MovieDetail} exact />

      {/* NOT FOUND */}
      {/* <Route path="*" component={PageNotFound} /> */}
    </Switch>
  );
};
