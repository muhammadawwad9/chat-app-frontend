import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.scss";
import ScrollToBottom from "react-scroll-to-bottom";

//components imports
import InfoBar from "../../components/InfoBar/InfoBar";
import Message from "../../components/Message/Message";

let socket;
let ENDPOINT = "chat-app-websockets-backend.herokuapp.com/";

const Chat = () => {
  //states
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [connecting, setConnecting] = useState(true);
  const history = useHistory();

  //useEffect
  useEffect(() => {
    const { userName, room } = queryString.parse(window.location.search);
    socket = io(ENDPOINT);
    setUserName(userName);
    setRoom(room);

    socket.emit("join", { userName, room }, (error) => {
      if (error) {
        alert(error);
        history.push("/");
      }
    });

    return () => {
      socket.emit("disconnection");
      socket.off();
    };
  }, [ENDPOINT, history.location.pathname]);

  useEffect(() => {
    if (!history.location.pathname.startsWith("/chat")) {
      socket.emit("disconnection");
      socket.off();
    }
  }, [history.location.pathname]);

  useEffect(() => {
    socket.on("message", (message) => {
      setConnecting(false);
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
        <ScrollToBottom className="inner-container">
          <div className="chat-log">
            {connecting ? (
              <img src="/images/connecting.gif" />
            ) : (
              messages.map((message, i) => {
                return (
                  <Message
                    key={i}
                    message={message}
                    userName={userName.toLowerCase().trim()}
                  />
                );
              })
            )}
          </div>
        </ScrollToBottom>
        <div className="send-area">
          <input
            disabled={connecting}
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => (e.key == "Enter" ? sendMessage(e) : null)}
          />
          <button onClick={(e) => sendMessage(e)} disabled={connecting}>
            Send
          </button>
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
