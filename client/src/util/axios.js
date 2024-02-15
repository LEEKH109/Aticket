import axios from "axios";

const BASE_URL = "";

const apiClient = axios.create({
  baseURL: BASE_URL,
});
// 밑은 코드 예시 샘플
const UserApi = {
  login: async (userData) => {
    try {
      const response = await apiClient.post("/login", userData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  register: async (userData) => {
    try {
      const response = await apiClient.post("/register", userData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export { UserApi };
