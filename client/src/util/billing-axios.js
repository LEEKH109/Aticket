import axios from "axios";

const BASE_URL = `http://localhost:8081`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const billingApi = {
  // 결제 승인 요청
  approvePayment: (reservationId, pgToken, userId) => {
    return axiosInstance.post(`/billing/approve/${reservationId}`, {
      pgToken,
      userId,
    });
  },
  submitReservationForTicket: (userId, artId, timetableId, tickets) => {
    return axiosInstance.post(`/billing/reservation/ticket/${userId}`, {
      artId,
      timetableId,
      tickets,
    });
  },
  submitReservationForSeat: (userId, artId, seats) => {
    return axiosInstance.post(`/billing/reservation/seat/${userId}`, {
      artId,
      seats,
    });
  },
};

export { billingApi };
