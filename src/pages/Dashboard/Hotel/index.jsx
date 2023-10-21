import { Typography } from "@mui/material";
import styled from 'styled-components';
import NotTicketMessage from "../../../components/HotelComponents/NotTicketMessage";
import useTicket from '../../../hooks/api/useTicket';
import NotReservetionMessage from "../../../components/HotelComponents/NotReservationMessage";

export default function Hotel() {
  const ticket = useTicket()

  //VERIFICA SE O USUARIO TERMINOU O PAGAMENTO
  if (ticket.ticket === null) {
    return (
      <NotTicketMessage />
    );
  }

  //VERIFICA SE O HOTEL ESTÁ INCLUSO
  //ver uma forma melhor de fazer isso
  if (ticket.ticket) {
    if (ticket.ticket.TicketType.includesHotel === false)
      return (
        <NotReservetionMessage />
      )
  }

  function selecionarHotel(){
    setSelectedHotelId();
  }

  return (
    <>
      <StyledTypography variant="h4"> Escolha de hotel e quarto</StyledTypography>
      <>
        <Title>Primeiro, escolha seu hotel</Title>
        <HotelsContainer>
          <Button>
            <img />
            <h1>nome</h1>
            <p>tipos de acomodação</p>
            <h2>Single e Double</h2>
            <br />
            <p>vagas disponiveis</p>
            <h2>12</h2>
          </Button>
          <Button></Button>
        </HotelsContainer>
      </>
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
