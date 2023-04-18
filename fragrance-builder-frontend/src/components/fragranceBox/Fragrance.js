import React from "react";
import { FragranceStyle } from "./Fragrance.styled";

const Fragrance = ({ name, id, topNotes, middleNotes, baseNotes }) => {
  return (
    <FragranceStyle>
      <h3>{name}</h3>
      <div>
        {topNotes.map((note) => (
          <img src={note.image} alt="note"></img>
        ))}
        {middleNotes.map((note) => (
          <img src={note.image} alt="note"></img>
        ))}
        {baseNotes.map((note) => (
          <img src={note.image} alt="note"></img>
        ))}
      </div>
    </FragranceStyle>
  );
};

export default Fragrance;
