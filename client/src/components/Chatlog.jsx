import { useEffect, useState } from "react";
import { ChatApi } from "../util/chat-axios";

const Chatlog = ({ categoryId }) => {
    const [recentPage, setRecentPage] = useState([]);

    useEffect(() => {
        setRecentPage(ChatApi.chatRoom(categoryId));
    }, [categoryId]);
    
    return (
        <div>
            <h1>채팅 기록들</h1>
            {recentPage.length > 0 ? (
            <ul>
                {recentPage.map((chatlog) => ( 
                    <li key={chatlog.chatlogId}>
                        <img src={chatlog.profileUrl} alt="profile" />
                        <span>{chatlog.nickname}: </span>
                        <span>{chatlog.content}</span>
                        <span> ({new Date(chatlog.regDate).toLocaleString()})</span>
                    </li>
                ))}
            </ul>
                        ) : (
                            <p>채팅이 존재하지 않습니다.</p>
                        )}
        </div>
    );
};

export default Chatlog;
