import React from "react";

import "./header.css";
import { BOM } from "../../services/defined.action";
import AddMovie from "../movie/AddMovie";

const Header = (props) => {
  const { SESSION_ID:token } = userData;
  return (
    <header className="App-header">
      { token ?(<AddMovie />):(<h5>{props.text}</h5>)}
    </header>
  );
};




const userData = BOM.GetItem("userData") ? BOM.GetItem("userData") : {};
export default Header;
