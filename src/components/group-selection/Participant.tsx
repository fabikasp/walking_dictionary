import React from "react";
import { MdClose } from "react-icons/md";

type ParticipantProps = {
    participant: string,
    deleteParticipant: () => void
};
 
export const Participant = ({participant, deleteParticipant}: ParticipantProps) => {
  return (
    <div className="group-selection-participant">
        <span>{participant}</span> <MdClose className="group-selection-delete-icon" onClick={deleteParticipant} />
    </div>
  );
};
