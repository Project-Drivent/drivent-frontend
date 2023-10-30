import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import styled from "styled-components";
import NotTicketMessage from "../../../components/HotelComponents/NotTicketMessage";
import NotReservetionMessage from "../../../components/HotelComponents/NotReservetionMessage";
import { useTicket } from "../../../hooks/api/useTicket";
import useHotels from "../../../hooks/api/useHotel";
import { getRoomTypes, getCapacity } from "../../../components/HotelComponents/RoomData";
import { Title, RoomCard, RoomConteiner, ReservedRoom, HotelsContainer } from "../../../components/HotelComponents/HotelStyled";
import { useBooking } from "../../../hooks/api/useBooking";

export default function Hotel() {
  const ticket = useTicket();
  const hotel = useHotels();
  const { booking, getBooking } = useBooking();
  const [hotels, setHotels] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [clickedHotel, setClickedHotel] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [lastSelectedRoom, setLastSelectedRoom] = useState(null);
  const [buttonText, setButtonText] = useState("Reservar Quarto");

    // Onde pegar as infos --- PODE APAGAR ---
    // console.log('Está pago?', ticket.ticket?.status); // --> 'RESERVED' or 'PAID'
    // console.log('Inclui hotel?', ticket.ticket?.TicketType.includesHotel); // --> true or false
    // console.log('É Remoto?', ticket.ticket?.TicketType.isRemote);  // --> true or false

    useEffect(() => {
      setHotels(hotel.hotels);
    }, [hotel.hotels]);

  const status = ticket.ticket?.status;
  const includesHotel = ticket.ticket?.TicketType.includesHotel;
  const isRemote = ticket.ticket?.TicketType.isRemote;

  if (status !== 'PAID') return <NotTicketMessage />;
  if (!includesHotel || isRemote) return <NotReservetionMessage />;

  function clickedButton() {
    setButtonText("Trocar Quarto")
  }

  function Hoteis() {
    console.log("booking", booking.Room.name)
    if (hotels && !booking) {
      return hotels.map((hotel) => (
        <Button
          key={hotel.id}
          selected={selectedButton === hotel.id}
          onClick={() => {
            if (selectedButton === hotel.id) {
              setSelectedButton(null);
              setShowMessage(false);
              setClickedHotel(null);
            } else {
              setSelectedButton(hotel.id);
              setShowMessage(true);
              setClickedHotel(hotel);
            }
          }}
        >
          <img src={hotel.image} alt={hotel.name} />
          <h1>{hotel.name}</h1>
          <p>Tipos de Acomodação</p>
          <h2>{getRoomTypes(hotel.Rooms)}</h2>
          <br />
          <p>Vagas Disponíveis</p>
          <h2>{getCapacity(hotel.Rooms)}</h2>
        </Button>
      ));
        }else if(hotels && booking){
          const reservedHotel = hotels.find((hotel) => hotel.id === booking.Room.hotelId);
          return (
            <div>
              <Button
                key={reservedHotel.id}
                style={{
                  backgroundColor: '#FFEED2'
                }}
                selected={selectedButton === reservedHotel.id}
                onClick={() => {
                  if (selectedButton === reservedHotel.id) {
                    setSelectedButton(null);
                    setShowMessage(false);
                    setClickedHotel(null)
                    clickedButton();
                  } else {
                    setSelectedButton(reservedHotel.id);
                    setShowMessage(true);
                    setClickedHotel(reservedHotel);
                  }
                }}
              >
                <img src={reservedHotel.image} alt={reservedHotel.name} />
                <h1>{reservedHotel.name}</h1>
                <p>Quarto Reservado</p>
                <h2>{getRoomTypes(reservedHotel.Rooms)}</h2>
                <br />
                <p>Pessoas no seu Quarto</p>
                <h2>{getCapacity(reservedHotel.Rooms)}</h2>
              </Button>
            </div>
          );
            } else {
      return <p>Carregando...</p>;
    }
  }

  function Rooms(clickedHotel) {
    const reservedRoomId = 37

    if (clickedHotel && clickedHotel.Rooms) {
      return (
        <RoomConteiner>
          {clickedHotel.Rooms.map((room) => (
            <RoomCard
              key={room.id}
      style={{
        backgroundColor:
          room.capacity === 0
            ? "#CECECE"
            : room.id === reservedRoomId
            ? "#FFEED2"
            : "white",
        pointerEvents: room.capacity === 0 ? "none" : "auto",
      }}
              onClick={() => {
                if (room.capacity !== 0) {
                  setLastSelectedRoom(room.id);
                }
              }}
            >
              <h1>{room.name}</h1>
            </RoomCard>
          ))}
        </RoomConteiner>
      );
    } else {
      return <p>Carregando</p>;
    }
  }
  return (
    <>
      <StyledTypography variant="h4"> Escolha de hotel e quarto</StyledTypography>
      <>
        <Title>Primeiro, escolha seu hotel</Title>
        <HotelsContainer>
          {Hoteis()}
        </HotelsContainer>
      </>
      {showMessage && (
        <div>
          <Title>
            <br />
            Ótima pedida! Agora escolha o seu quarto:
          </Title>

          {Rooms(clickedHotel)}
          <ReservedRoom onClick={clickedButton}>
            {buttonText}
          </ReservedRoom>

        </div>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const Button = styled.button`
outline: none;
border: none;
height: 264px;
width:196px;
font-family: 'Roboto', sans-serif;
z-index:4;
background-color: ${props => props.selected ? '#FFEED2' : '#EBEBEB'};
border-radius: 8px;
img{
  height: 109px;
  width:168px;
  background-color:blue;
  border-radius: 8px;
}
h1{
  text-align: left;
  font-size: 20px;
  line-height: 23px;
  padding:10px;
  color: #343434;
}
p{
  font-size: 12px;
  font-weight:700;
  line-height: 14px;
  text-align: left;
  margin-left:10px;
  color: #3C3C3C;
}
h2{
  text-align: left;
  font-size: 12px;
  font-weight:400;
  line-height: 14px;
  margin-left:10px;
  color: #3C3C3C;
}`
