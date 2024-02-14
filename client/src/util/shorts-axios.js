import axios from "axios";
import instance from "./interceptor";

const shortsInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ROOT,
});

const ShortsAPI = {
  getShorts: (shortsId) => {
    return shortsInstance.get(`shorts/${shortsId}`);
  },

  getShortsList: (category) => {
    return shortsInstance.get(`shorts/recommend?category=${category}`);
  },

  getRecommendShortsList: (category) => {
    return instance.get(`shorts/recommend?category=${category}`);
  },

  getLike: (shortsId) => {
    return instance.get(`shorts/${shortsId}/like`);
  },

  postLike: (shortsId, data) => {
    return instance.post(`shorts/${shortsId}/like`, data);
  },

  viewLog: (shortsId, data) => {
    return instance.put(`shorts/${shortsId}/viewlog`, data);
  },
};

export { ShortsAPI };
