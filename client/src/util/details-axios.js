import axios from "axios";

const BASE_URL = "http://localhost:8081/art";

const apiClient = axios.create({
  baseURL: BASE_URL,
});
// 상세정보 불러오기
const DetailApi = {
  getDetail: async (id) => {
    try {
      // const response = await apiClient.get("/"+id);
      const response = null;
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

};

export { DetailApi };
