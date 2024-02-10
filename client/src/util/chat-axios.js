import axios from "axios";
import ErrorPage from "../pages/ErrorPage";
import instance from "./interceptor";

const BASE_URL = "http://i10a704.p.ssafy.io:8081/chat";//http://localhost:8080/chat
const apiClient = axios.create({
    baseURL: BASE_URL,
});

const ChatApi = {

    // sendChatlog: (category, chatlog) => instance.post(`/send/${category}`, chatlog).then(response=>response.data).catch(error=>console.error(error)),

    preview: (category) => {
        return apiClient.get(`/preview/${category}`)
    },
    
    // chatRoom: (categoryId) => apiClient.get(`/room/${categoryId}`).then(response=>response.data).catch(error=>console.error(error)),

    // chatScroll: (category, page) => apiClient.get(`/room/${category}?page=${page}`).then(response => response.data.data).catch(error=> console.error(error)),

    chatScroll: (category, page) => {
        return apiClient.get(`/room/${category}?page=${page}`)
    }

    // chatList: () => apiClient.get("").then(response=>response.data).catch(error=>console.error(error)),//임시

}

export {ChatApi};
