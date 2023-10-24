import api from './api';

export async function submitPayment(paymentData, userToken) {
    const response = await api.post('/payments/process', paymentData, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    });

    return response.data;
}
