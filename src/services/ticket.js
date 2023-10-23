import api from './api';


export async function fetchTickets(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function fetchTicketTypes(token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function createTicket(ticketData, token) {
  const response = await api.post('/tickets', ticketData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
}
