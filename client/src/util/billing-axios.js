import axios from "axios";

const BASE_URL = `http://i10a704.p.ssafy.io:8081`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const billingApi = {
  // 전시 결제 준비 요청
  submitReservationForTicket: (userId, artId, timetableId, tickets) => {
    return axiosInstance.post(`/billing/reservation/ticket/${userId}`, {
      artId,
      timetableId,
      tickets,
    });
  },
  // 뮤지컬, 연극 결제 준비 요청
  submitReservationForSeat: (userId, artId, seats) => {
    return axiosInstance.post(`/billing/reservation/seat/${userId}`, {
      artId,
      seats,
    });
  },
  // 결제 승인 요청
  approvePayment: (reservationId, pgToken, userId) => {
    return axiosInstance.post(`/billing/approve/${reservationId}`, {
      pgToken,
      userId,
    });
  },
  // 제 내역 조회(결제 번호로)
  retrieveTicketReservationInfo: (reservationId) => {
    return axiosInstance.get(`/billing/history/reservation/${reservationId}`);
  },
  // 결제완료 내역 조회(유저 아이디로)
  retrieveReservationHistory: (userId) => {
    return axiosInstance.get(`/billing/history/${userId}`);
  },
};

export { billingApi };
