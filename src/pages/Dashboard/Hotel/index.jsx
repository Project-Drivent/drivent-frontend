import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import styled from "styled-components";
import NotTicketMessage from "../../../components/HotelComponents/NotTicketMessage";
import NotReservetionMessage from "../../../components/HotelComponents/NotReservetionMessage";
import useTicket from "../../../hooks/api/useTicket";
import useHotels from "../../../hooks/api/useHotel";
import { getRoomTypes, getCapacity } from "../../../components/HotelComponents/RoomData";
import { Title, RoomCard, HotelsContainer } from "../../../components/HotelComponents/HotelStyled";

export default function Hotel() {
  const ticket = useTicket();
  const hotel = useHotels();
  const [hotels, setHotels] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [clickedHotel, setClickedHotel] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    setHotels(hotel.hotels);
  }, [hotel.hotels]);

  if (ticket.tickets) {
    if (ticket.tickets.length === 0) {
      return <NotTicketMessage />;
    }
    if (ticket.tickets[0].includesHotel === false)
      return <NotReservetionMessage />;
  }

  function Hoteis() {
    if (hotels) {
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
    } else {
      return <p>Carregando...</p>;
    }
  }

  function Rooms(clickedHotel) {
    if (clickedHotel && clickedHotel.Rooms) {
      return (
        <div>
          {clickedHotel.Rooms.map((room) => (
            <RoomCard key={room.id} style={{ backgroundColor: room.capacity === 0 ? '#CECECE' : 'white' }}>
               <h1>{room.name}</h1>
            </RoomCard>
          ))}
        </div>
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
  ;