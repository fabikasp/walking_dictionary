import React from "react";
import { MdClose } from "react-icons/md";

type ParticipantProps = {
    key: number,
    participant: string
};
 
export const Participant = ({key, participant}: ParticipantProps) => {
  // TODO: Delete implementieren

  return (
    <div key={key} className="group-selection-participant">
        <span>{participant}</span> <MdClose className="group-selection-delete-icon" />
    </div>
  );
};
