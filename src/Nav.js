import React from "react";
import "./Nav.css";
import { useEffect, useState } from "react";


const Nav = () => {

  const [show, handleshow] = useState(false);
// NAV BAR EFFECT
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleshow(true);
      } else handleshow(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);



  return (
    <>
      <div className={`nav ${show && "nav_black"}`}>
        <img
          src="images/netf logo.jpg"
          alt="Netflix Logo"
          className="nav_Netlogo"
        />

        <img
          src="images/Netflix-avatar.png"
          alt="Netflix Logo"
          className="nav_Avtlogo"
        />
      </div>
    </>
  );
};

export default Nav;
