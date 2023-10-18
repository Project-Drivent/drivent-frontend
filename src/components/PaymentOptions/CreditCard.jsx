import styled from "styled-components";
import chip from "/chip.png";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

const CreditCardContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #929292;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  color: #fff;
  margin-top: 14px;
  height: 139px;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Chip = styled.div`
  background: url(${chip}) no-repeat;
  background-size: contain;
  height: 40px;
  width: 60px;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputStyle = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  background: transparent;
  color: #fff;
  font-size: 16px;
  margin: 5px;
  width: 100%;
  padding: 5px;
      margin-top: 6px;
`;

const ExampleText = styled.p`
  font-size: 14px;
  color: #ccc;
  margin-top: 0px;
  margin-left: 5px;
`;

function CreditCard() {
  return (
    <Container>
      <CreditCardContainer>
        <CardTop>
          <Chip />
        </CardTop>
        <p>Your Name Here</p>
        <p>**** **** **** ****</p>
      </CreditCardContainer>
      <InputGroup>
        <InputStyle type="text" placeholder="Card Number" />
        <ExampleText>E.g.: 49..., 51..., 36..., 37...</ExampleText>
        <InputStyle type="text" placeholder="Name" />
        <InputRow>
          <InputStyle type="text" placeholder="Valid Thru (MM/AA)" />
          <InputStyle type="text" placeholder="CVC" />
        </InputRow>
      </InputGroup>
    </Container>
  );
}

export default CreditCard;
