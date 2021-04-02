import React from "react";
import "./Message.scss";
import ReactEmoji from "react-emoji";
const Message = ({ message, userName }) => {
  if (message.userName != userName) {
    return (
      <div className="member-message">
        <div className="userName">{message.userName}</div>
        <div className="text">{ReactEmoji.emojify(message.text)}</div>
      </div>
    );
  } else {
    return (
      <div className="my-message">
        <div className="userName">{message.userName}</div>
        <div className="text">{ReactEmoji.emojify(message.text)}</div>
      </div>
    );
  }
};

export default Message;
