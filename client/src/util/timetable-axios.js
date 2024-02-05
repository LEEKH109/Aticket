import axios from "axios";

const BASE_URL = `http://localhost:8080`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const timetableApi = {
  // 예약 가능한 날짜 불러오기
  getAvailableDates: (artId) => {
    return axiosInstance.get(`/time/${artId}`);
  },
  // 특정 날짜의 예약 가능한 시간표 불러오기
  getTimetables: (artId, date) => {
    return axiosInstance.get(`/time/${artId}/${date}`);
  },
};

export { timetableApi };
