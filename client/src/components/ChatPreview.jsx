import React, { useState, useEffect } from "react";
import { ChatApi } from "../util/chat-axios";

const ChatPreview = ({ category}) => {

    const [chatPreviews, setChatPreviews] = useState([]);

    useEffect(() => { 
        setChatPreviews(ChatApi.preview(category));
        // if (!categoryid) {
        //     navigate("/chat");
        //     return;
        // }
        ChatApi.preview(category).then(res => setChatPreviews(res.data.data)).catch(err => console.log(err))
        // console.log(ChatApi.preview(category));
      }, []);

    return (
        <div>
            {chatPreviews.length > 0 ? (
                <ul>
                    {chatPreviews.map((preview) => (
                        <li key={preview.chatlogId}>
                            {preview.content}&nbsp;&nbsp;
                            {preview.nickname}
                            &nbsp;&nbsp;<span>({new Date(preview.regDate).toLocaleString()})</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>채팅이 존재하지 않습니다.</p>
            )}
        </div>
    );
};

export default ChatPreview;
