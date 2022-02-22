import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { Web3ContextProvider } from "./hooks";

import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Web3ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
