import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./home/Home";
import { GroupSelection } from "./group-selection/GroupSelection";
import "./App.css";
 
export const App = () => {
  const [participants, setParticipants] = useState<string[]>([]);

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
        </Routes>
    </BrowserRouter>
  );
};
