import { ChatApi } from "../util/chat-axios"; 
import ChatInput from "../components/ChatInput";
import Chatlog from "../components/Chatlog";

const ChatRoom = ({categoryId}) => {
    const handleSendChatlog = async(chatlog) => {
        await ChatApi.sendChatlog(categoryId, chatlog);
    }; //ChatInput에 넘겨줄 것 중 하나. 버튼 클릭 시 apiClient.post(`/${categoryId}/send`, chatlog)로 요청

    return (
        <div>
            <h2>채팅 카테고리</h2>
            <Chatlog categoryId={categoryId}/>
            <ChatInput user={user} categoryId={categoryId} onSend={handleSendChatlog} />
        </div>
    ); 
};

export default ChatRoom;