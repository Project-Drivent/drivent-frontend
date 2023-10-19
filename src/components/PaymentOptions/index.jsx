import { Title, SubTitle, SubTitleAccommodation, SubTitleCard } from "./titleSubTitle";
import { BoxesContainer, StyledBox, Value, Label, StyledBoxCard } from "./boxOptions";
import { useState } from "react";
import AccommodationOptions from "./AccommodationOptions";
import { ReserveButton } from "./reserveButton";
import CreditCard from "./CreditCard";
import useTicketType from "../../hooks/api/useTicket";

export default function PaymentOptions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAccommodationOption, setSelectedAccommodationOption] = useState(null);
  const [reservaFinalizada, setReservaFinalizada] = useState(false);
  const ticketTypes = useTicketType();

  console.log(ticketTypes); // FIXME: Apagar linha

  const handleBoxClick = (index) => {
    if (selectedOption === true) {
      setSelectedOption(null);
      setSelectedAccommodationOption(null);
    } else {
      setSelectedOption(index);
    }
  };

  const finalizarReserva = () => {
    // Coloque aqui a lógica para finalizar a reserva

    // Atualize o estado reservaFinalizada para true
    setReservaFinalizada(true);
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
              <Label>R$600</Label>
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

            ticketTypes.tickets.map ((item, index) => (
              
              //💡 {item.includesHotel} e {item.isRemote} -> retorna true ou false
              
              <StyledBox
                key={index}
                onClick={() => handleBoxClick(index)}
                selected={selectedOption === index}
              >
                <Value>{item.name}</Value>
                <Label>{`R$ ${item.price}`}</Label>
              </StyledBox>
      
          ))}
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
      )}
    </>
  );
}
