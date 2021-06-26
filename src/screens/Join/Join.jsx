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

    history.push(`/chat?userName=${userName}&room=${room}`);
  };

  return (
    <div className="Join">
      <div className="details-section">
        <h1>Join</h1>
        <input
          type="text"
          placeholder="Choose a Username"
          onChange={(e) => setUserName(e.target.value)}
          autoComplete="off"
          maxLength="12"
        />
        <input
          type="text"
          placeholder="school trip 587"
          onChange={(e) => setRoom(e.target.value)}
          autoComplete="off"
        />

        <button type="submit" onClick={(e) => checkFields(userName, room, e)}>
          Enter Room
        </button>
      </div>
      <div className="error-message">{errorMessage}</div>
    </div>
  );
};

export default Join;
