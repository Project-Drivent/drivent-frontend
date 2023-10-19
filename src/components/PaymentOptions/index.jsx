import React, { useState } from "react";
import { Title, SubTitle, SubTitleAccommodation, SubTitleCard } from "./titleSubTitle";
import { BoxesContainer, StyledBox, Value, Label, StyledBoxCard } from "./boxOptions";
import { ReserveButton } from "./reserveButton";
import CreditCard from "./CreditCard";
import useTicketType, { useTicket } from "../../hooks/api/useTicket";
import useEnrollment from "../../hooks/api/useEnrollment";
import AccommodationOptions from "./AccommodationOptions";

export default function PaymentOptions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAccommodationOption, setSelectedAccommodationOption] = useState(null);
  const [reservaFinalizada, setReservaFinalizada] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const ticketTypes = useTicketType();
  const enrollmentData = useEnrollment();
  const ticket = useTicket();

  console.log(ticket);
  console.log(ticketTypes);
  console.log(enrollmentData);

  const handleBoxClick = (index) => {
    if (selectedOption === index) {
      setSelectedOption(null);
      setSelectedAccommodationOption(null);
      setSelectedTicket(null);
    } else {
      setSelectedOption(index);
      setSelectedTicket(ticketTypes.tickets[index]);
    }
  };

  function calcularSomaTotal() {
    let total = 0;

    if (selectedOption !== null) {
      total += ticketTypes.tickets[selectedOption].price;
    }

    if (selectedAccommodationOption !== null) {
      if (selectedAccommodationOption === "Option1") {
        total += 350; // Use o valor correto
      }
    }

    return total;
  }

  const finalizarReserva = async () => {
    if (selectedTicket) {
      try {
        const response = await ticketTypes.createTicket(selectedTicket.id);
        console.log("Ticket criado com sucesso:", response);
        setReservaFinalizada(true);
      } catch (error) {
        console.error("Erro ao criar o ticket:", error);
      }
    } else {
      console.error("Nenhum ticket selecionado.");
      console.log(selectedTicket.id);
    }
  };

  return (
    <>
      <Title>Ingresso e pagamento</Title>

      {reservaFinalizada ? (
        <>
          <div>
            <SubTitleCard>Ingresso escolhido</SubTitleCard>
          </div>

          <BoxesContainer>
            <StyledBoxCard
              onClick={() => handleBoxClick(0)}
              selected={selectedOption === 0}
            >
              <Value>Presencial + Com Hotel</Value>
              <Label>R$ {calcularSomaTotal()}</Label>
            </StyledBoxCard>
          </BoxesContainer>

          <div>
            <SubTitleCard>Pagamento</SubTitleCard>
            <div>
              <CreditCard></CreditCard>
            </div>
          </div>
        </>
      ) : (
        <>
          <SubTitle>Primeiro, escolha sua modalidade</SubTitle>

          <BoxesContainer>
            {!ticketTypes.ticketLoading &&
              ticketTypes.tickets.map((item, index) => (
                <StyledBox
                  key={index}
                  onClick={() => handleBoxClick(index)}
                  selected={selectedOption === index}
                >
                  <Value>{item.name}</Value>
                  <Label>{`R$ ${item.price}`}</Label>
                </StyledBox>
              ))
            }
          </BoxesContainer>

          {selectedOption !== null && selectedTicket.name === "Presencial" && (
            <>
              <SubTitleAccommodation>
                Ótimo! Agora escolha sua modalidade de hospedagem
              </SubTitleAccommodation>
              <AccommodationOptions
                selectedOption={selectedAccommodationOption}
                onOptionSelect={setSelectedAccommodationOption}
                selectedTicket={selectedTicket}
              />
            </>
          )}

          {selectedAccommodationOption !== null && (
            <>
              <SubTitleAccommodation>
                Fechado! O total ficou em R$ {calcularSomaTotal()}. Agora é só confirmar:
              </SubTitleAccommodation>
              <ReserveButton onClick={finalizarReserva}>Finalizar Reserva</ReserveButton>
            </>
          )}
        </>
      )}
    </>
  );
}
