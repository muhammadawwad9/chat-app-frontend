import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//screens imports
import Join from "./screens/Join/Join";
import Chat from "./screens/Chat/Chat";

const App = () => (
  <Router>
    <Route exact path="/" component={Join} />
    <Route path="/chat" component={Chat} />
  </Router>
);

export default App;
