import React from "react";
import "./Message.scss";
import ReactEmoji from "react-emoji";
const Message = ({ message, userName }) => {
  return (
    <div className={userName == message.userName ? "Message" : "justify-start"}>
      <div className="userName">{message.userName}</div>
      <div className="text">{ReactEmoji.emojify(message.text)}</div>
    </div>
  );
};

export default Message;
