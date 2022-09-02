import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Participant } from "./Participant";
import "./GroupSelection.css";
 
export const GroupSelection = () => {
  const [currentParticipant, setCurrentParticipant] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const navigate = useNavigate();

  const addParticipant = () => {
    if (currentParticipant == "") {
      // TODO: Fehlermeldung unter Input

      return;
    }

    if (currentParticipant.length > 25) {
      // TODO: Fehlermeldung unter Input

      return;
    }

    setParticipants([...participants, currentParticipant]);
    setCurrentParticipant("");
  };

  return (
    <div id="group-selection">
      <div id="group-selection-body">
        <p id="group-selection-headline">Teilnehmer hinzufügen</p>
        <input id="group-selection-input" type="text" placeholder="Teilnehmer" value={currentParticipant} onChange={event => setCurrentParticipant(event.target.value)} />
        <div id="group-selection-participants">
          {participants.map((participant, index) => <Participant key={index} participant={participant} />)}
        </div>
        <button id="group-selection-add-button" onClick={addParticipant}>Hinzufügen</button>
        <button id="group-selection-continue-button" onClick={() => navigate("/letter-selection")}>Fortfahren</button>
      </div>
    </div>
  );
};
