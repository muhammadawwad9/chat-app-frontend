import React, { useEffect } from "react";
import "./Message.scss";
import ReactEmoji from "react-emoji";
const Message = ({ message, userName }) => {
  return (
    <div
      className={`Message ${
        userName != message.userName ? "justify-start" : ""
      }`}
    >
      <div className="userName">{message.userName}</div>
      <div className="text">{ReactEmoji.emojify(message.text)}</div>
    </div>
  );
};

export default Message;
