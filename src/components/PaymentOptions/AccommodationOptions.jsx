import { StyledBox, Value, Label } from "./boxOptions";

export default function AccommodationOptions({
  selectedOption,
  onOptionSelect,
  selectedTicket,
}) {
  return (
    <div style={{ display: "flex" }}>
      {selectedTicket.includesHotel && (
        <StyledBox
          onClick={() => toggleOption("Option1")}
          selected={selectedOption === "Option1"}
        >
          <Value>Com Hotel</Value>
          <Label>+ R$350</Label>
        </StyledBox>
      )}
      {selectedTicket.isRemote && (
        <StyledBox
          onClick={() => toggleOption("Option2")}
          selected={selectedOption === "Option2"}
        >
          <Value>Online</Value>
          <Label>+ R$0</Label>
        </StyledBox>
      )}
    </div>
  );

  function toggleOption(option) {
    // Verifique se a opção selecionada é a mesma que o usuário deseja desmarcar
    if (selectedOption === option) {
      onOptionSelect(null); // Desmarque a opção se for a mesma
    } else {
      onOptionSelect(option); // Caso contrário, selecione a opção
    }
  }
}
