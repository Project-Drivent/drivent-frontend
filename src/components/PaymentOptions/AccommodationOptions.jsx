import React from "react";
import { StyledBox, Value, Label } from "./boxOptions";

export default function AccommodationOptions({
  selectedOption,
  onOptionSelect,
}) {
  return (
    <div style={{ display: "flex" }}>
      <StyledBox
        onClick={() => onOptionSelect("Option1")}
        selected={selectedOption === "Option1"}
      >
        <Value>Sem Hotel</Value>
        <Label>+ R$ 0</Label>
      </StyledBox>
      <StyledBox
        onClick={() => onOptionSelect("Option2")}
        selected={selectedOption === "Option2"}
      >
        <Value>Com Hotel</Value>
        <Label>+ R$350</Label>
      </StyledBox>
    </div>
  );
}
