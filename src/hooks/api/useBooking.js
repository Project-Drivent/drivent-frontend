import useToken from '../useToken';
import useAsync from '../useAsync';

import * as bookingApi from '../../services/bookingApi';

export function usePostBooking() {
  const token = useToken();

  const  {
    loading: bookingLoading,
    error: bookingError,
    act: booking
  } = useAsync((data) => bookingApi.postBooking(data, token), false);

  return {
    bookingLoading,
    bookingError,
    booking
  };
}

export function useBooking() {
    const token = useToken();
  
    const {
      data: booking,
      loading: bookingLoading,
      error: bookingError,
      act: getBooking
    } = useAsync((data) => bookingApi.getBooking(token));
  
    return {
      booking,
      bookingLoading,
      bookingError,
      getBooking
    };
  }