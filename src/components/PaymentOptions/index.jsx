import { useState, useEffect } from "react";
import { Title, SubTitle, SubTitleAccommodation, SubTitleCard,EnrollmentErrorMessage,CenteredContent } from "./titleSubTitle";
import { BoxesContainer, StyledBox, Value, Label, StyledBoxCard } from "./boxOptions";
import { ReserveButton } from "./reserveButton";
import useTicketType, { useTicket } from "../../hooks/api/useTicket";
import AccommodationOptions from "./AccommodationOptions";
import useEnrollment from "../../hooks/api/useEnrollment";
import CreditCard from "./creditCard";

export default function PaymentOptions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAccommodationOption, setSelectedAccommodationOption] = useState(null);
  const [reservaFinalizada, setReservaFinalizada] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const ticketTypes = useTicketType();
  const ticket = useTicket();
  const enrollmentUser = useEnrollment();
  const [createdTicket, setCreatedTicket] = useState(null)

  // console.log(createdTicket)

  // console.log('Usuário inscrito?', enrollmentUser);
console.log('Usuário c/ ticket?', ticket.ticket);
  // console.log('Ticket type existe?', ticketTypes );

  useEffect(() => {
    if (ticket.ticket && ticket.ticket !== null) { 
      // Se o usuário já tiver um ticket, defina reservaFinalizada como true.
      setReservaFinalizada(true);
    }
    if (createdTicket === null && reservaFinalizada) {
      setCreatedTicket(ticket.ticket?.TicketType);
    }
  }, [ticket, createdTicket, reservaFinalizada]);

  const resetStates = () => {
    setSelectedOption(null);
    setSelectedAccommodationOption(null);
    setSelectedTicket(null);
  };

  const handleBoxClick = (index) => {
    if (selectedOption === index) {
      resetStates(); // Reseta os estados se o botão for clicado novamente
    } else {
      resetStates(); // Reseta os estados ao selecionar uma nova opção
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
      let incremento = 0;
      if (selectedAccommodationOption === "Option1") {
        incremento = 1;
      }
      const response = await ticketTypes.createTicket(selectedTicket.id + incremento);
      try {
        console.log("Ticket criado com sucesso:", response);
        setReservaFinalizada(true);
        setCreatedTicket(response.TicketType);
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

      {enrollmentUser.enrollment === null ? (
        <CenteredContent>
          <EnrollmentErrorMessage>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</EnrollmentErrorMessage>
        </CenteredContent>
      ) : (
        reservaFinalizada ? (
          <>
            <div>
              <SubTitleCard>Ingresso escolhido</SubTitleCard>
            </div>

            <BoxesContainer>
            <StyledBoxCard 
              style={{ backgroundColor: '#FFEED2', border: '#FFEED2' }}
            >
              <Value style={{ color: '#454545'}} >{createdTicket?.name}</Value>
              <Label style={{ color: '#898989'}} >R$ {createdTicket?.price}</Label>
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
                  item.name !== 'Presencial + Com Hotel' &&
                 
                  
                    <StyledBox
                    key={index}
                      onClick={() => handleBoxClick(index)}
                      selected={selectedOption === index}
                    >
                      <Value>{item.name.split(' ')[0]}</Value>
                      <Label>{`R$ ${item.price}`}</Label>
                    </StyledBox>
                ))
              }
            </BoxesContainer>

            {selectedOption !== null && selectedTicket.name.split(' ')[0].toLowerCase() === "presencial" && (
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

            {selectedOption !== null && selectedTicket.name.toLowerCase() === "online" && (
              <>
                <SubTitleAccommodation>
                  Fechado! O total ficou em R$ {calcularSomaTotal()}. Agora é só confirmar:
                </SubTitleAccommodation>
                <ReserveButton onClick={finalizarReserva}>Finalizar Reserva</ReserveButton>
              </>
            )}
          </>
        )
      )}
    </>
  );
}
