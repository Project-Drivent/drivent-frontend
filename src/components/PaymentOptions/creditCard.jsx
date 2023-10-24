import styled from "styled-components";
import chip from "/chip.png";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const CreditCardContainer = styled.div`
  width: 300px;
  height: 180px !important;
  padding: 20px;
  background-color: #929292;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  color: #fff;
  margin-top: 14px;
  margin-left: 8px;
  height: 139px;
  font-family: 'Times New Roman', Times, serif;

  p {
    margin-left: 10px;
    font-size: 16px;
    line-height: 30px;
    color: #DDDDDD;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p { 
      font-size: 14px;
      line-height: 20px;
      width: 180px;
      
    }
    div {
      p { 
          width: 60px;
        }
      text-align: center;
      margin-bottom: 14px;
    }
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Chip = styled.div`
  background: url(${chip}) no-repeat;
  background-size: contain;
  height: 50px;
  width: 70px;
  margin-left: 10px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:  25px;
  margin-left: 20px;
  gap: 10px;

  input[type=number]::-webkit-inner-spin-button { 
    display: none;
    -webkit-appearance: none;
  }
`;

const InputRow = styled.div`
  display: flex;
  width: 100%;
`;

const InputStyle = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  background: transparent;
  font-size: 16px;
  margin-right: 50px;
  width: 91%;
  padding: 5px;
  margin-top: 6px;
  padding-right: 40px;
`;

const ExampleText = styled.p`
  font-size: 14px;
  color: #ddd;
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
        <p style={{ fontSize: "28px"}}>•••• •••• •••• ••••</p>
        <span>
          <p>YOUR NAME HERE</p>
          <div>
            <p>valid thru</p>
            <p>•• / ••</p>
          </div>
        </span>
      </CreditCardContainer>
      <InputGroup>
        <InputStyle type="number" placeholder="Card Number" />
        <ExampleText>E.g.: 49..., 51..., 36..., 37...</ExampleText>
        <InputStyle type="text" placeholder="Name" />
        <InputRow>
          <InputStyle type="txt" placeholder="Valid Thru (MM/AA)" />
          <InputStyle type="number" placeholder="CVC" />
        </InputRow>
      </InputGroup>
    </Container>
  );
}

export default CreditCard;