import axios from "axios";

const BASE_URL = "http://localhost:8080/art";

const apiClient = axios.create({
  baseURL: BASE_URL,
});
// 상세정보 불러오기
const DetailApi = {
  getDetail: async (id) => {
    try {
      const response = await apiClient.get("/"+id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

// === 상세정보 조회 시 조회수 증가 ===
//   updateHits: async (id) => {
//     try {
//       const response = await apiClient.get("/춭머ㅏ우너ㅏㅁㄴㅇㅁ", id);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   },

};

export { DetailApi };
