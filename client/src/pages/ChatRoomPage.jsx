import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ChatApi } from "../util/chat-axios";
import Chatlog from "../components/Chatlog";
import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';
import {LoginContext, IsLoginProvider, useLoginState } from '../components/LoginContext';

const ChatRoom = () => {
    
    const token = useContext(LoginContext);
    const location = useLocation();
    const { categoryid } = location.state;
    const [chatContent, setChatContent] = useState("");
    console.log(token);
    let stompClient = null;

    useEffect(()=>{
        const connect = () => {
            stompClient = Stomp.over(function(){
                return new SockJS("http://localhost:8080/ws");
            })
            stompClient.connect({},()=> {
                onConnected(categoryid);
            }, onError);
        };

        const onConnected = (categoryid) => {
            stompClient.subscribe(`/chat/room/${categoryid}`, onChatlogReceived);
        }; 

        const onError = (error) => {
            console.error('STOMP error', error);
            reconnect();
        };

        const reconnect = () => {
            setTimeout(() => {
                console.log('Attempting to reconnect...');
                connect();
            }, 5000);
        };
            
        if (!stompClient || !stompClient.connect) {
            connect();
        };


        
        const onChatlogReceived = (payload) => {
            const newChatlog = JSON.parse(payload.body); // 서버로부터 받은 데이터를 파싱
            const chatlogElement = document.createElement('li');
            
            chatlogElement.classList.add('chat-message'); // 채팅 메시지에 대한 CSS 클래스 추가
        
            // 사용자 프로필 이미지를 생성하고 속성 설정
            const avatarElement = document.createElement('img');
            avatarElement.src = newChatlog.profileUrl; // 사용자 프로필 URL 사용
            avatarElement.alt = `Avatar of ${newChatlog.nickname}`; // 대체 텍스트로 'nickname' 사용
            chatlogElement.appendChild(avatarElement);
        
            // 사용자 닉네임을 표시하는 요소 생성
            const usernameElement = document.createElement('span');
            usernameElement.textContent = newChatlog.nickname; // 사용자 닉네임 사용
            chatlogElement.appendChild(usernameElement);
        
            // 채팅 메시지 내용을 표시하는 요소 생성
            const textElement = document.createElement('p');
            textElement.textContent = newChatlog.content; // 채팅 내용 사용
            chatlogElement.appendChild(textElement);
        
            // 메시지 등록 날짜를 포맷팅하여 표시
            const dateElement = document.createElement('span');
            dateElement.textContent = new Date(newChatlog.regDate).toLocaleString(); // 'regDate'를 포맷팅하여 사용
            chatlogElement.appendChild(dateElement);
        
            // 채팅 메시지를 채팅 영역에 추가하고 스크롤 조정
            chatArea.appendChild(chatlogElement);
            chatArea.scrollTop = chatArea.scrollHeight; // 새 메시지가 추가될 때마다 스크롤을 아래로 이동
        };

        return()=>{
            if (stompClient && stompClient.connected) {
                // stompClient.disconnect();
                stompClient.disconnect(() => {
                    console.log('Disconnected on component unmount.');
                });
            }
        }
    }, [categoryid, token])

    const sendChat = async (event) => {
        event.preventDefault(); // Form의 기본 제출 동작 방지

        const user = {
            // kakaoId: ,
            // name: ,
            // email: ,
            // birthday: ,
            // nickname: ,
            // profileUrl: ,
            // role: 
            //유저를 불러와야함
        }

        const chatlog = {
            user: user,
            categoryId: categoryid,
            content: chatContent,
            regDate: new Date(),
        };

        try {
            const response = await ChatApi.sendChatlog(categoryid, chatlog);
        } catch (error) {
            console.error("채팅 전송 실패:", error);
        }
        setChatContent("");
    };



    return (
        <div>
            <h2>채팅 카테고리 = {categoryid}</h2>
            <div id="chatArea">
                <Chatlog categoryId={categoryid}/>
            </div>
            <div>
                <form name="chatform" >
                    <textarea name="chat-insert" id="chatContent" placeholder="채팅을 입력해주세요" value={chatContent} onChange={(e) => setChatContent(e.target.value)} required></textarea>
                    <button type="submit" onClick={sendChat}>submit</button>
                </form>
            </div>
        </div>
    );
};

export default ChatRoom;
