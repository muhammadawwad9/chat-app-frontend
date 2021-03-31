import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.scss";

const Join = () => {
  //states
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //function
  const errorHandler = (e) => {
    e.preventDefault();
    setErrorMessage("Please Fill Up The Fields");
  };

  return (
    <div className="Join">
      <div className="details-section">
        <h1>Join</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Room"
          onChange={(e) => setRoom(e.target.value)}
          autoComplete="off"
        />
        <Link
          onClick={(e) => (!userName || !room ? errorHandler(e) : null)}
          to={`/chat?userName=${userName}&room=${room}`}
        >
          <button type="submit">Enter Room</button>
        </Link>
        <div className="error-message">{errorMessage}</div>
      </div>
    </div>
  );
};

export default Join;
