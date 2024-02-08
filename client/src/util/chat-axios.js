import axios from "axios";
import ErrorPage from "../pages/ErrorPage";

const BASE_URL = "http://i10a704.p.ssafy.io:8081/chat";

const apiClient = axios.create({
    baseURL: BASE_URL,
});

const ChatApi = {

    sendChatlog: (category, chatlog) => apiClient.post(`/send/${category}`, chatlog).then(response=>response.data).catch(error=>console.error(error)),

    preview: (category) => apiClient.get(`/preview/${category}`).then(response=>response.data).catch(error=>console.error(error)),
    
    // chatRoom: (categoryId) => apiClient.get(`/room/${categoryId}`).then(response=>response.data).catch(error=>console.error(error)),

    chatScroll: (category, page) => apiClient.get(`/room/${category}?page=${page}`).then(response => response.data).catch(error=> console.error(error)),

    // chatList: () => apiClient.get("").then(response=>response.data).catch(error=>console.error(error)),//임시

}

export {ChatApi};
