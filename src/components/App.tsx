import React from "react";
import "./../stylesheets/App";
 
export const App = () => {
  return (
    <div id="app">
      <p id="app-headline">Wandelndes Wörterbuch</p>

      <p id="app-description">Finde Wörter mit dem Anfangsbuchstaben!</p>

      <button id="app-start-button">Start</button>
    </div>
  );
};
