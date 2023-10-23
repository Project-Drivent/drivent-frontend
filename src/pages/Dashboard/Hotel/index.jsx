import React, { useState } from "react";
import { Typography } from "@mui/material";
import styled from "styled-components";
import NotTicketMessage from "../../../components/HotelComponents/NotTicketMessage";
import NotReservetionMessage from "../../../components/HotelComponents/NotReservetionMessage";
import useTicket from "../../../hooks/api/useTicket";
import useHotels from "../../../hooks/api/useHotel";
import { useEffect } from "react";

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

  if (ticket.tickets === null) {
    return <NotTicketMessage />;
  }
  //if (ticket.tickets) {
  //if (ticket.ticket.TicketType.includesHotel === false)
     // return <NotReservetionMessage />;
 // }

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
          <h2>{getHotelCapacity(hotel.Rooms)}</h2>
        </Button>
      ));
    } else {
      return <p>Carregando</p>;
    }
  }

  function Quartos(clickedHotel) {
    if (clickedHotel && clickedHotel.Rooms) {
      return (
        <div>
          {clickedHotel.Rooms.map((room) => (
            <RoomCardContainer key={room.id}>
              <h1>{room.name}</h1>
            </RoomCardContainer>
          ))}
        </div>
      );
    } else {
      return <p>Carregando</p>;
    }
  }

  function getHotelCapacity(rooms) {
    let capacity = 0;
    let reserved = 0;
    rooms.forEach((room) => {
      capacity += room.capacity;
      if (room.Booking) {
        reserved += room.Booking.length;
      }
    });
    return capacity - reserved;
  }

  function getRoomTypes(rooms) {
    console.log(rooms);
    const roomTypes = {
      1: false,
      2: false,
      3: false,
    };

    rooms.forEach((room) => {
      roomTypes[room.capacity] = true;
    });

    if (roomTypes[1] && !roomTypes[2] && !roomTypes[3]) {
      return "Single";
    } else if (roomTypes[2] && !roomTypes[1] && !roomTypes[3]) {
      return "Double";
    } else if (roomTypes[3] && !roomTypes[1] && !roomTypes[2]) {
      return "Triple";
    } else if (roomTypes[1] && roomTypes[2] && !roomTypes[3]) {
      return "Single e Double";
    } else if (roomTypes[1] && roomTypes[3] && !roomTypes[2]) {
      return "Single e Triple";
    } else if (roomTypes[2] && roomTypes[3] && !roomTypes[1]) {
      return "Double e Triple";
    } else if (roomTypes[1] && roomTypes[2] && roomTypes[3]) {
      return "Single, Double e Triple";
    } else {
      return "Não informado";
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

          {Quartos(clickedHotel)}

        </div>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const RoomCardContainer = styled.div`
  width: 190px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid #cecece;
  margin-right: 17px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  box-sizing: border-box;
  background-color: #E9E9E9;
  cursor: pointer;
  h1 {
    color: #CECECE ;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    max-width: 70px;
    max-height: 23px;
    overflow: hidden;
    margin-left: 6px;
  }
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

const HotelsContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;
  gap: 20px;
  scrollbar-width: thin;
  scrollbar-color: #dcdcdc #f5f5f5;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #dcdcdc;
    border-radius: 4px;*
  }
  &::-webkit-scrollbar-track {
    background-color: #ffffff;
  }
`;
const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  text-align: left;
  color: #8e8e8e;
  margin-bottom: 20px;
`;