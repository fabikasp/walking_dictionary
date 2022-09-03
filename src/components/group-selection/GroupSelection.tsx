import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Participant } from "./Participant";
import "./GroupSelection.css";
 
type GroupSelectionProps = {
  participants: string[],
  addParticipant: (participant: string) => void,
  deleteParticipant: (index: number) => void
};

export const GroupSelection = ({participants, addParticipant, deleteParticipant}: GroupSelectionProps) => {
  const [currentParticipant, setCurrentParticipant] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateAndAddParticipant = () => {
    if (currentParticipant == "") {
      setErrorMessage("Mindestens ein Buchstabe notwendig.");

      return;
    }

    if (currentParticipant.length > 30) {
      setErrorMessage("Maximal 30 Buchstaben erlaubt.");

      return;
    }

    setErrorMessage("");
    addParticipant(currentParticipant);
    setCurrentParticipant("");
  };

  return (
    <div id="group-selection">
      <div id="group-selection-body">
        <p id="group-selection-headline">Teilnehmer festlegen</p>
        <input id="group-selection-input" type="text" placeholder="Teilnehmer" value={currentParticipant} onChange={event => setCurrentParticipant(event.target.value)} />
        <div id="group-selection-error">{errorMessage}</div>
        <div id="group-selection-participants">
          {participants.map((participant, index) => <Participant key={index} participant={participant} deleteParticipant={() => deleteParticipant(index)} />)}
        </div>
        <button id="group-selection-add-button" onClick={validateAndAddParticipant}>Hinzufügen</button>
        <button id="group-selection-continue-button" onClick={() => navigate("/letter-selection")}>Fortfahren</button>
      </div>
    </div>
  );
};
