import React from "react";
import "./Header.scss";
const Header = () => {
  return (
    <div onClick={() => window.scroll(0,0)} className="header-component">
      <img src="/assets/cinema.png" alt="" />
      MOVIE HUB
      <img src="/assets/camera.png" alt="" />
    </div>
  );
};

export default Header;
