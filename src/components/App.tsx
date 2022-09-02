import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
 
export const App = () => {
  const navigate = useNavigate();

  return (
    <div id="app">
      <div id="app-body">
        <p id="app-headline">Wandelndes Wörterbuch</p>
        <p id="app-description">Finde Wörter mit dem Anfangsbuchstaben!</p>
        <button id="app-start-button" onClick={() => navigate("/group-selection")}>Start</button>
      </div>
    </div>
  );
};
