import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatApi } from "../util/chat-axios"; // 채팅 관련 데이터를 요청하기 위한 Axios 인스턴스를 가져옵니다.

const ChatPreview = ({categoryId}) => {
    const [chatPreviews, setChatPreviews] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchChatPreviews = async () => {
            try {
                const previews = await ChatApi.preview(categoryId);
                setChatPreviews(previews);
            } catch (error) {
                console.error("채팅 미리보기 화면에 접근 불가", error);
            }
        };
        fetchChatPreviews();
    },[categoryId]);
    
    const navigateToChatRoom = () => {
        navigate(`/chat/${categoryId}/paging`);
    } //여기서는 await의 chatRoom로 이동이 아니라 navigate로.

    return (
        <div>
            <h1>{categoryId}번 카테고리 채팅 미리보기 화면</h1>
            <div background-color="gray">
                <p>s</p>
            <button onClick={navigateToChatRoom}>채팅방 이동</button>
            </div>
        </div>
    )
};

export default ChatPreview;