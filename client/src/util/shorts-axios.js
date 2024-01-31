import axios from "axios";

const BASE_URL = "https://picsum.photos/v2/list";
const INFO_URL = "https://picsum.photos/id/";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// 밑은 코드 예시 샘플
const ShortsAPI = {
  getShorts: () => {
    return apiClient.get();
  },
};

const InfoAPI = {
  getInfo: (id) => {
    const infoApiClient = axios.create({
      baseURL: INFO_URL+id+"/info",
    });
    return infoApiClient.get();
  }
}

export { ShortsAPI, InfoAPI };
