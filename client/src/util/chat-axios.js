import axios from "axios";

const BASE_URL = "http://localhost:8080/chat";

const apiClient = axios.create({
    baseURL: BASE_URL,
});

const ChatApi = {

    chatList: async () => {
        try {
            const response = await apiClient.get("");
            console.log("chatList에서"+response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    preview: async (categoryId) => {
        try {
            const response = await apiClient.get(`${categoryId}/preview`); //여기서 오류가 뜨네
            console.log("preview에서"+response.data);
            return response.data;
        } catch (error) {
            // console.error(error);
        }
    },

    chatRoom: async (categoryId, page) => {
        try {
            const response = await apiClient.get(`${categoryId}/paging`, categoryId);
            console.log("chatRoom에서"+response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    
    sendChatlog: async (categoryId, chatlog) => {
        try {
            const response = await apiClient.post(`/${categoryId}/send`, chatlog);
            console.log("sendChatlog에서"+response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

}

export {ChatApi};