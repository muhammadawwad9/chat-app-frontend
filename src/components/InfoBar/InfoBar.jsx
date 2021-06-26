import React from "react";
import "./InfoBar.scss";
import { useHistory } from "react-router-dom";

const InfoBar = ({ room }) => {
  const history = useHistory();

  return (
    <div className="InfoBar">
      <div className="left-side">
        <div className="online-icon"></div>
        <span>{room}</span>
      </div>
      <div className="right-side" onClick={() => history.push("/")}></div>
    </div>
  );
};

export default InfoBar;
