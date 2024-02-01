import axios from "axios";

const BASE_URL = "http://localhost:8080/chat";

const apiClient = axios.create({
    baseURL: BASE_URL,
});

const ChatApi = {

    chatList: () => apiClient.get("").then(response=>response.data).catch(error=>console.error(error)),

    preview: (categoryId) => apiClient.get(`${categoryId}/preview`).then(response=>response.data).catch(error=>console.error(error)),

    chatRoom: (categoryId, page) => apiClient.get(`${categoryId}/paging`).then(response=>response).catch(error=>console.error(error)),

    sendChatlog: (categoryId, chatlog) => apiClient.post(`/${categoryId}/send`, chatlog).then(response=>response.data).catch(error=>console.error(error)),

}

export {ChatApi};