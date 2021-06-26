import React, { useEffect, useRef } from "react";
import "./OnlineRoomUsers.scss";

//functions imports
import isChildOf from "../../utils/isChildOf";

//icons imports
import { IoMdCloseCircle } from "react-icons/io";
import { BsPersonLinesFill } from "react-icons/bs";
const OnlineRoomUsers = ({ onlineUsers, setShowOnlineUsers }) => {
  console.log("HERA: ", onlineUsers);

  useEffect(() => {
    const checkClicked = (e) => {
      let isChild = isChildOf([onlineWrapper.current], e.target);
      if (!isChild) setShowOnlineUsers(false);
    };
    window.addEventListener("click", checkClicked);

    return () => window.removeEventListener("click", checkClicked);
  }, []);

  const onlineWrapper = useRef(null);
  return (
    <div className="OnlineRoomUsers">
      <div className="online-wrapper" ref={onlineWrapper}>
        <div className="close">
          <IoMdCloseCircle
            size={30}
            color="rgb(218, 27, 27)"
            onClick={() => setShowOnlineUsers(false)}
          />
        </div>
        <header>
          <h4>People in this room</h4>
        </header>
        <div className="online-users">
          {onlineUsers
            ? onlineUsers.map((user) => {
                return (
                  <div className="online-user">
                    <BsPersonLinesFill size={25} color="rgb(23, 189, 23)" />

                    <h4>{user}</h4>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default OnlineRoomUsers;
