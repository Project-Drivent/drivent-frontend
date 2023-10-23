import styled from 'styled-components';
import { Typography } from '@mui/material';

export default function NotTicketMessage() {
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <ErrorTicketMessage>
        Você precisa ter confirmado pagamento antes
        <br />
        de fazer a escolha de hospedagem
      </ErrorTicketMessage>
    </>
  );
}


const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const ErrorTicketMessage = styled.p`
  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  color: #8e8e8e;
  margin-top: 240px;
`;