import axios from "axios";

const BASE_URL = "https://picsum.photos/v2/list";

const apiClient = axios.create({
  baseURL: BASE_URL,
});
// 밑은 코드 예시 샘플
const ShortsAPI = {
  getShorts: () => {
    return apiClient.get();
  },
};

export { ShortsAPI };
