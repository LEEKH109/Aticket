import axios from "axios";

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
};

export { billingApi };
