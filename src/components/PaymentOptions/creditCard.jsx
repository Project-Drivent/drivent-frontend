import styled from "styled-components";
import chip from "/chip.png";
import React, { useState } from "react";


const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: absolute;
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

const Button = styled.button`
width: 182px;
height: 37px;
border-radius: 4px;
border: none;
box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
font-family: Roboto;
font-size: 12px;
font-weight: 400;
line-height: 16px;
letter-spacing: 0em;
text-align: center;
position: relative;
    top: 250px;
    right: 860px;





`

function CreditCard() {

  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [validThru, setValidThru] = useState("");
  const [cvc, setCVC] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [showForm, setShowForm] = useState(true);


  const handlePayment = () => {

    
    // Função para validar o número do cartão usando o algoritmo de Luhn
    const isCardNumberValid = (cardNumber) => {
      const cardNumberDigits = cardNumber.replace(/\D/g, "").split('').map(Number);
      let sum = 0;
      let double = false;
      for (let i = cardNumberDigits.length - 1; i >= 0; i--) {
        let digit = cardNumberDigits[i];
        if (double) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        sum += digit;
        double = !double;
      }
      return sum % 10 === 0;
    };

    // Função para validar o formato da data de validade (MM/AA)
    const isExpirationValid = (validThru) => {
      const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      return regex.test(validThru);
    };

    // Função para validar o CVC (3 ou 4 dígitos)
    const isCVCValid = (cvc) => {
      const regex = /^\d{3,4}$/;
      return regex.test(cvc);
    };

    if (isCardNumberValid(cardNumber) && name && isExpirationValid(validThru) && isCVCValid(cvc)) {
      setPaymentConfirmed(true);
      // Oculta o formulário após a confirmação do pagamento
      setShowForm(false);
    }
  };
  return (
<Container>
  {paymentConfirmed ? (
    <div>Mensagem de pagamento confirmado</div>
  ) : (
    <>
      <CreditCardContainer>
        <CardTop>
          <Chip />
        </CardTop>
        <p style={{ fontSize: "28px" }}>•••• •••• •••• ••••</p>
        <span>
          <p>YOUR NAME HERE</p>
          <div>
            <p>valid thru</p>
            <p>•• / ••</p>
          </div>
        </span>
      </CreditCardContainer>
      <InputGroup>
        <InputStyle
          type="tel"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <ExampleText>E.g.: 49..., 51..., 36..., 37...</ExampleText>
        <InputStyle
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputRow>
          <InputStyle
            type="text"
            placeholder="Valid Thru (MM/AA)"
            value={validThru}
            onChange={(e) => setValidThru(e.target.value)}
          />
          <InputStyle
            type="tel"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCVC(e.target.value)}
          />
        </InputRow>
      </InputGroup>
      <Button onClick={handlePayment}>FINALIZAR PAGAMENTO</Button>
    </>
  )}
</Container>

  );
}

export default CreditCard;