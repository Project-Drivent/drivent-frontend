import styled from "styled-components";

export  const RoomCard = styled.div`
  width: 190px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid #cecece;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  box-sizing: border-box;
  background-color: #E9E9E9;
  cursor: pointer;
  h1 {
    color: #454545 ;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    margin-left: 10px;
  }
`;

export const ReservedRoom = styled.button`
height: 37px;
width:182px;
background-color:#E0E0E0;
border-radius: 10px;
border: 1px solid #cecece;
margin-top: 20px;
color: #454545 ;
text-align: center;
font-size: 14px;
cursor: pointer;
`

export const RoomConteiner = styled.div`
display: flex;
flex-direction: row;
gap: 15px;
`

export const HotelsContainer = styled.div`
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
`;
export const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  text-align: left;
  color: #8e8e8e;
  margin-bottom: 20px;
`;