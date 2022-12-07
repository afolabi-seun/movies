import React, { useEffect, useState } from "react";
import { BOM } from "../../services/defined.action";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.svg";
import "./navbar.css";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";

const Menu = () => (
  <>
    <p>
      <Link to={"/"} style={{color:'inherit', textDecoration:'none'}}>Home</Link>
    </p>
    {/* <p><a href="#w">What is GPT?</a></p>
    <p><a href="#possibility">Open AI</a></p>
    <p><a href="#features">Case Studies</a></p>
    <p><a href="#blog">Library</a></p> */}
  </>
);

const Navbar = () => {
  const { FIRST_NAME: firstName, SESSION_ID:token } = userData;
  const [toggleMenu, setToggleMenu] = useState();

  useEffect(() => {
    console.log();
  }, []);

  const onSignOut = () => {
    localStorage.clear();
    BOM.ReloadComponent();
  };

  return (
    <div className="__navbar">
      <div className="__navbar-links">
        <div className="__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="__navbar-links_container"><Menu /></div>
      </div>
      <div className="__navbar-sign">
        {token ? (
          <>
            <p><img
                    className="img-fluid img-responsive rounded-circle "
                    style={{marginRight:'10px'}}
                    src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    width={28}
                  />{firstName}</p>
            <p onClick={() => onSignOut()}>
              <span className="asterisks"> {`-> Sign out`}</span>
            </p>
          </>
        ) : (
          <>
            <SignIn />
            <SignUp />
          </>
        )}
      </div>
      <div className="__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="__navbar-menu_container scale-up-center">
            <div className="__navbar-menu_container-links">
              <Menu />
              <div className="__navbar-menu_container-links-sign">
                {token ? (
                  <>
                    <p><i className="fa fa-user"/>&nbsp; {firstName}</p>
                    <p onClick={() => onSignOut()}>
                      <span className="asterisks"> {`-> Sign out`}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <SignIn />
                    <SignUp />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const userData = BOM.GetItem("userData") ? BOM.GetItem("userData") : {};

export default Navbar;
