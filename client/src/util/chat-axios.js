import axios from "axios";
import ErrorPage from "../pages/ErrorPage";

const BASE_URL = "http://localhost:8080/chat";

const apiClient = axios.create({
    baseURL: BASE_URL,
});

const ChatApi = {

    sendChatlog: (categoryId, chatlog) => apiClient.post(`/send/${categoryId}`, chatlog).then(response=>response.data).catch(error=>console.error(error)),

    preview: (categoryId) => apiClient.get(`/preview/${categoryId}`).then(response=>response.data).catch(error=>console.error(error)),
    
    chatRoom: (categoryId) => apiClient.get(`/room/${categoryId}`).then(response=>response.data).catch(error=>console.error(error)),

    chatScroll: (categoryId, page, size) => apiClient.get(`/paging/${categoryId}?page=${page}&size=${size}`).then(response => response.data).catch(error=> console.error(error)),

    // chatList: () => apiClient.get("").then(response=>response.data).catch(error=>console.error(error)),//임시

}

export {ChatApi};