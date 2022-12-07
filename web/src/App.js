import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import "./utilities/App.css";
import { Header, Movie, Search, Navbar } from "./components";
import { RoutedContent } from "./routes";
import history from "./history";


const App = () => {
  return (
    <Router history={history}>
      <RoutedContent />
    </Router>
  );
};

export default App;
