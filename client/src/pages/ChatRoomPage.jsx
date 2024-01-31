import { useEffect, useState } from "react";
import { ChatApi } from "../util/chat-axios"; 
import ChatInput from "../components/ChatInput";
import Chatlog from "../components/Chatlog";
import MyPage from "./LoginPage";

const ChatRoom = ({categoryId}) => {
    const [chatlog, setChatlog] = useState([]); //채팅 로그 배열로 초기화
    const [page, setPage] = useState(0); //페이지 번호 관리하는 배열
    const [loading, setLoading] = useState(false);

    const user = {
        name: "최지원",
        nickname: "최젼",
        profileUrl: "https://t1.daumcdn.net/keditor/emoticon/friends1/large/002.gif"
    }

    useEffect(()=>{
        //새 채팅 불러오기
        const fetchMoreChatlog = async () => {
            if (loading) return;
            setLoading(true);
    
            try {
                const response = await ChatApi.chatRoom(categoryId, page); //
                setChatlog((prevChatlog) => [...response.data, ...prevChatlog]);
                setPage(prevPage=> prevPage + 1);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const handleScroll =() => {
            //스크롤 이벤트 로직
            if (window.scrollY === 0) {
                fetchMoreChatlog(); //위에서 정의한 새 채팅 불러오기 실행
            }
        };
        window.addEventListener("scroll", handleScroll); //스크롤 시 위의 함수 실행.
        // return () => window.removeEventListener("scroll", handleScroll);
    },[page, loading, categoryId]);

    const handleSendChatlog = async(chatlog) => {
        await ChatApi.sendChatlog(categoryId, chatlog);
    }; //ChatInput에 넘겨줄 것 중 하나. 버튼 클릭 시 apiClient.post(`/${categoryId}/send`, chatlog)로 요청

    return (
        <div>
            <h2>채팅 카테고리</h2>
            <Chatlog chatlog={chatlog}/>
            <div>로그인 여부 따지기. 로그인 안되어있다면 ChatInput 대신 이거 띄움
                <MyPage/>
            </div>
            <ChatInput user={user} categoryId={categoryId} onSend={handleSendChatlog} />
        </div>
    ); 
};

export default ChatRoom;