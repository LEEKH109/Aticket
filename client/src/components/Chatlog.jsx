import { useEffect, useState } from "react";
import { ChatApi } from "../util/chat-axios"; 

const Chatlog = ({categoryId}) => {
    const [chatlog, setChatlog] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMoreChatlog = async () => {
            if (loading) return;
            setLoading(true);

            try {
                const response = await ChatApi.chatRoom(categoryId, page);
                setChatlog((prevChatlog) => [...prevChatlog, ...response.data]);
                setPage(prevPage => prevPage + 1);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const handleScroll = () => {
            // 스크롤 이벤트 로직 (예: 페이지 맨 위에 도달했을 때 새 로그 불러오기)
            if (window.scrollY === 0) {
                fetchMoreChatlog();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [page, loading, categoryId]);

    return (
        <div>
            채팅 이전 기록
            {chatlog.map((log) => (
                <div key={log.chatlogId}>
                    {log.user.nickname}
                    {log.content}<br/>
                    &nbsp;&nbsp;<span>({new Date(preview.regDate).toLocaleString()})</span>
                </div>
            ))}
        </div>
    )
}

export default Chatlog;