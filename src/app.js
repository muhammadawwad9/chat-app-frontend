import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//screens imports
import Join from "./screens/Join/Join";
import Chat from "./screens/Chat/Chat";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Join} />
      <Route path="/chat" component={Chat} />
    </Switch>
  </Router>
);

export default App;
