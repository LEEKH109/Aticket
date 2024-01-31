import { useState } from "react";

const ChatInput = ({user, categoryId, onSend}) => {
   
    const [chatContent, setChatContent] = useState(""); //입력된 내용

    const handleSend = () => {
        const chatlog = {
            user: user,
            categoryId: categoryId,
            content: chatContent,
            regDate: new Date(),
        };//chatlog 객체 생성

        onSend(chatlog); //보낸다(chatroom페이지에서 정의: ChatApi.sendChatlog(categoryId, chatlog))
        setChatContent("");//입력창 다시 빈 칸으로
    } //채팅 내용 입력 후 버튼 클릭 시 해당 함수 실행

    return (
        <div>
            <form name="chatform" action="" method="post">
                <textarea name="chat-insert" placeholder="채팅을 입력해주세요" value={chatContent} onChange={(e) => setChatContent(e.target.value)} required></textarea>
                <button type="submit" onClick={handleSend}></button>
            </form>
        </div>
    )
}

export default ChatInput;