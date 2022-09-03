import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./home/Home";
import { GroupSelection } from "./group-selection/GroupSelection";
import { GameSettings } from "./game-settings/GameSettings";
import { Game } from "./game/Game";
import "./App.css";
 
export const App = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [timer, setTimer] = useState<number | null>(null);
  const [verifyWords, setVerifyWords] = useState(true);

  const addParticipant = (participant: string) => {
    setParticipants([...participants, participant]);
  };

  const deleteParticipant = (index: number) => {
    setParticipants(
      participants.filter((element: string, elementIndex: number) => elementIndex != index)
    );
  };

  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="group-selection" element={<GroupSelection participants={participants} addParticipant={addParticipant} deleteParticipant={deleteParticipant} />} />
            <Route path="game-settings" element={<GameSettings 
              selectedLetter={selectedLetter} 
              setSelectedLetter={setSelectedLetter} 
              timer={timer} 
              setTimer={setTimer} 
              verifyWords={verifyWords} 
              setVerifyWords={setVerifyWords} 
              participants={participants} 
            />} />
            <Route path="game" element={<Game letter={selectedLetter} participants={participants} timer={timer} />} />
        </Routes>
    </BrowserRouter>
  );
};
