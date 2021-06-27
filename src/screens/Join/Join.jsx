import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Join.scss";

const Join = () => {
  //states
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  //function
  const errorHandler = (e, err) => {
    e.preventDefault();
    setErrorMessage(err);
  };

  const checkFields = (userName, room, e) => {
    userName = userName.trim().toLowerCase();
    room = room.trim().toLowerCase();
    if (!userName || !room) return errorHandler(e, "Please Fill Up The Fields");
    else if (userName.length > 12 || userName.length < 4)
      return errorHandler(e, "Username must be between 4-12 characters");
    else if (room.length > 16)
      return errorHandler(e, "Room can be max 16 characters");

    history.push(`/chat?userName=${userName}&room=${room}`);
  };

  const submitBtn = useRef(null);

  return (
    <div className="Join">
      <h1>Online Chat Rooms</h1>
      <div className="details-section">
        <h1>Join</h1>
        <input
          type="text"
          placeholder="Choose a Username"
          onChange={(e) => setUserName(e.target.value)}
          autoComplete="off"
          maxLength="12"
          onKeyDown={(e) =>
            e.key == "Enter" ? submitBtn.current.click() : null
          }
        />
        <input
          type="text"
          placeholder="Room"
          onChange={(e) => setRoom(e.target.value)}
          autoComplete="off"
          maxLength="16"
          onKeyDown={(e) =>
            e.key == "Enter" ? submitBtn.current.click() : null
          }
        />

        <button
          type="submit"
          onClick={(e) => checkFields(userName, room, e)}
          ref={submitBtn}
        >
          Enter Room
        </button>
      </div>
      <img src="/images/chatting.png" />

      <div className="error-message">{errorMessage}</div>
    </div>
  );
};

export default Join;
