import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./App";
import { RoomProvider } from "./context";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <RoomProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RoomProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
