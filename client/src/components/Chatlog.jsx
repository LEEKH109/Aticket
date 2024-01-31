import { useEffect, useState } from "react";
import { ChatApi } from "../util/chat-axios"; 

const Chatlog = ({chatlog}) => {
    return (
        <div>
            채팅 이전 기록
            {chatlog.map((log, index) => (
                <div key={index}>
                    {/* 채팅 로그 내용 렌더링 */}
                    {log.message}
                </div>
            ))}
        </div>
    )
}

export default Chatlog;