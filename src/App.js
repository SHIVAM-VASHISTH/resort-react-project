import React from "react";
import "./App.css";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";

import Navbar from "./components/Navbar";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route exact path="/rooms/:slug/book" component={Booking} />
        <Route
          exact
          path="/rooms/:slug/confirmation"
          component={Confirmation}
        />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
