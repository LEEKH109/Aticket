import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = `http://localhost:8080`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const billingApi = {
  // 결제 승인 요청
  approvePayment: (reservationId, pgToken) => {
    return axiosInstance.post(`/billing/approve/${reservationId}`, null, {
      params: { pgToken },
    });
  },
  submitReservationForTicket: (artId, timetableId, tickets) => {
    const reservationId = uuidv4();
    const bookerName = "testUser";
    return axiosInstance.post("/billing/reservation/ticket", {
      artId,
      timetableId,
      reservationId,
      bookerName,
      tickets,
    });
  },
};

export { billingApi };
