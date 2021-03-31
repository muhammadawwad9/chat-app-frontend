import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.scss";
//components imports
import InfoBar from "../../components/InfoBar/InfoBar";
import Message from "../../components/Message/Message";

let socket;
let ENDPOINT = "https://chat-app-websockets-backend.herokuapp.com/";
const Chat = () => {
  //states
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  //useEffect
  useEffect(() => {
    const { userName, room } = queryString.parse(window.location.search);
    socket = io(ENDPOINT);
    setUserName(userName);
    setRoom(room);
    socket.emit("join", { userName, room }, (error) => {
      if (error) {
        alert(error);
        window.location = "/";
      }
    });
  }, [ENDPOINT, window.location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev].concat([message]));
    });

    socket.on("roomData", ({ users }) => {
      setOnlineUsers(users.map((user) => user.userName));
    });
  }, []);

  //function for sending messages
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) socket.emit("sendMessage", message, () => setMessage(""));
  };

  return (
    <div className="Chat">
      <div className="container">
        <InfoBar room={room} />
        <div className="inner-container">
          <div className="chat-log">
            {messages.map((message, i) => {
              return <Message key={i} message={message} userName={userName} />;
            })}
          </div>
        </div>
        <div className="send-area">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => (e.key == "Enter" ? sendMessage(e) : null)}
          />
          <button onClick={(e) => sendMessage(e)}>Send</button>
        </div>
      </div>
      <h1>Online users:</h1>
      <div className="online-users">
        {onlineUsers.map((user, i) => {
          return (
            <div className="user" key={i}>
              <div className="online-icon"></div>
              <li>{user} </li>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
