import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Just for development. When you deploy it wont render twice
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
