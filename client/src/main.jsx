import React from "react";
import ReactDOM from "react-dom/client";
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/Store';
import App from "./App";
import axios from "axios";
import "./index.css";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);