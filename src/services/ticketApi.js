import api from "./api.js"

export async function getTicketsTypes(token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  

  return response.data;
}

export async function postTicket(token, ticketTypeId) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    ticketTypeId: ticketTypeId,
  };

  const response = await api.post('/tickets', data, config);

  return response.data;
}
