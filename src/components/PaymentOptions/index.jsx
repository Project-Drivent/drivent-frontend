import { Title, SubTitle, SubTitleAccommodation } from "./titleSubTitle";
import { BoxesContainer, StyledBox, Value, Label } from "./boxOptions";
import { useState } from "react";
import AccommodationOptions from "./AccommodationOptions";
import { ReserveButton } from "./reserveButton";

export default function PaymentOptions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAccommodationOption, setSelectedAccommodationOption] = useState(null); // Estado para opção de hospedagem

  const handleBoxClick = (index) => {
    if (selectedOption === index) {
      setSelectedOption(null);
      setSelectedAccommodationOption(null); // Limpe a seleção de hospedagem ao desmarcar a opção
    } else {
      setSelectedOption(index);
    }
  };

  const finalizarReserva = () => {
    // Coloque aqui a lógica para finalizar a reserva
    console.log("Reserva finalizada com sucesso!");
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
            selectedOption={selectedAccommodationOption}
            onOptionSelect={setSelectedAccommodationOption}
          />
        </>
      )}

      {selectedAccommodationOption !== null && (
        <>
          <SubTitleAccommodation>Fechado! O total ficou em R$ 600. Agora é só confirmar:</SubTitleAccommodation>
          <ReserveButton onClick={finalizarReserva}>Finalizar Reserva</ReserveButton>
        </>
      )}
    </>
  );
}
