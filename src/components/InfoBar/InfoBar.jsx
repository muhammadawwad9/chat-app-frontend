import React from "react";
import "./InfoBar.scss";

const InfoBar = ({ room }) => {
  return (
    <div className="InfoBar">
      <div className="left-side">
        <div className="online-icon"></div>
        <span>{room}</span>
      </div>
      <div className="right-side" onClick={() => (window.location = "/")}></div>
    </div>
  );
};

export default InfoBar;
