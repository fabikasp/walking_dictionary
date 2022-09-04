import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
 
export const Home = () => {
  const navigate = useNavigate();

  return (
    <div id="home">
      <div id="home-body">
        <p id="home-headline">Wandelndes Wörterbuch</p>
        <p id="home-description">Finde Wörter mit dem Anfangsbuchstaben!</p>
        <button id="home-start-button" onClick={() => navigate("/group-selection")}>START</button>
      </div>
    </div>
  );
};
