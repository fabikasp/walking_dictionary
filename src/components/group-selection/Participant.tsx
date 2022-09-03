import React from "react";
import { MdClose } from "react-icons/md";
import { ParticipantProps } from "./types";
 
export const Participant = ({participant, deleteParticipant}: ParticipantProps) => {
  return (
    <div className="group-selection-participant">
        <span>{participant}</span> <MdClose className="group-selection-delete-icon" onClick={deleteParticipant} />
    </div>
  );
};
