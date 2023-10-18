import { Title, SubTitle, SubTitleAccommodation } from "./titleSubTitle";
import { BoxesContainer, StyledBox, Value, Label } from "./boxOptions";
import React, { useState } from "react";
import AccommodationOptions from "./AccommodationOptions";

export default function PaymentOptions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null); // Adicionado estado para a seleção de hospedagem

  const handleBoxClick = (index) => {
    if (selectedOption === index) {
      setSelectedOption(null);
    } else {
      setSelectedOption(index);
    }
  };

  return (
    <>
      <Title>Ingresso e pagamento</Title>
      <SubTitle>Primeiro, escolha sua modalidade</SubTitle>

      <BoxesContainer>
        <StyledBox
          onClick={() => handleBoxClick(0)}
          selected={selectedOption === 0}
        >
          <Value>Presencial</Value>
          <Label>R$250</Label>
        </StyledBox>
        <StyledBox
          onClick={() => handleBoxClick(1)}
          selected={selectedOption === 1}
        >
          <Value>Online</Value>
          <Label>R$100</Label>
        </StyledBox>
      </BoxesContainer>

      {selectedOption !== null && (
        <>
          <SubTitleAccommodation>
            Ótimo! Agora escolha sua modalidade de hospedagem
          </SubTitleAccommodation>
          <AccommodationOptions
            selectedOption={selectedAccommodation}
            onOptionSelect={setSelectedAccommodation}
          />
        </>
      )}
    </>
  );
}
