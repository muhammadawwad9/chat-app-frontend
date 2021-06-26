import React, { useState, useEffect } from "react";
import "./InfoBar.scss";
import { useHistory } from "react-router-dom";

//components imports
import OnlineRoomUsers from "../OnlineRoomUsers/OnlineRoomUsers";

//icons imports
import { IoIosPeople } from "react-icons/io";
const InfoBar = ({ room, onlineUsers }) => {
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);

  const history = useHistory();

  return (
    <div className="InfoBar">
      {showOnlineUsers ? (
        <OnlineRoomUsers
          setShowOnlineUsers={setShowOnlineUsers}
          onlineUsers={onlineUsers}
        />
      ) : null}
      <div className="left-side">
        <div className="online-icon"></div>
        <span>{room}</span>
      </div>
      <div className="show-online" onClick={() => setShowOnlineUsers(true)}>
        <IoIosPeople size={30} color="rgb(23, 189, 23)" />
        <div className="quick-view-online">
          {onlineUsers.slice(0, 3).map((user, i) => {
            return (
              <span>
                {user} {i == onlineUsers.slice(0, 3).length - 1 ? " ..." : ","}
              </span>
            );
          })}
        </div>
      </div>
      <div className="right-side" onClick={() => history.push("/")}></div>
    </div>
  );
};

export default InfoBar;
