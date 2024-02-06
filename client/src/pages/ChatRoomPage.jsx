import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ChatApi } from "../util/chat-axios";
import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';
import { LoginContext } from "../components/LoginContext";
import { UserApi } from "../util/user-axios";

const ChatRoom = () => {
    //Intersection Observer 사용하는 방식의 무한 스크롤 구현
    const { isLogin, userId } = useContext(LoginContext);
    let {categoryId} = useParams();
    const [chatContent, setChatContent] = useState("");
    const [chatlogs, setChatlogs] = useState([]);

    const [pins, setPins] = useState([]); //처음 chatlog부터 이어져야 하니 => 데이터를 담고 있는 state인 pins를 operator 연산자로 복제
    const [page, setPage] = useState(1);//스크롤이 닿았을 때 새롭게 데이터 페이지를 바꾸는 state
    const [loading, setLoading] = useState(false); //로딩 성공 여부 state  

    const token = useContext(LoginContext);
    const chatsRef = useRef(null);
    let stompClient = null;
    //scrollTop : 요소 맨 위에서부터 스크롤바까지의 거리
    //scrollHeight : 요소 전체 높이
    //clientHeight : 요소 중 현재 보이는 부분의 높이

    const fetchPins = async page => {
        const res = await fetch(`https://localhost:8080/chat/`)
    }

    useEffect(()=>{
        const connect = () => {
            stompClient = Stomp.over(function(){
                return new SockJS("http://localhost:8080/ws");
            })
            stompClient.connect({},()=> {
                onConnected(categoryId);
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
            avatarElement.src = newChatlog.user.profileUrl; // 사용자 프로필 URL 사용
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
    }, [categoryId, navigate, token])

    useEffect(() => {
        setChatlogs(ChatApi.chatRoom(categoryId));
        if (chatsRef.current) {
            chatsRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (chatsRef.current) {
                chatsRef.current.removeEventListener('scroll', handleScroll);
            }
        }        
    }, [chatsRef]);

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
            user: userId,
            categoryId: categoryId,
            content: chatContent,
            regDate: new Date(),
        };

        try {
            const response = await ChatApi.sendChatlog(categoryId, chatlog);
            onChatlogReceived(response);
        } catch (error) {
            console.error("채팅 전송 실패:", error);
        }
        setChatContent("");
    };

    const handleScroll = () => {
        const ref = chatsRef.current;
        if (Math.abs(ref.scrollTop) > ref.scrollHeight - ref.clentHeight -100) {
            //다음 페이지 요청
            //ChatApi.chatScroll: (categoryId, page, size) 에서 categoryId는 let {categoryId} = useParams(); 에서 불러온 친구, page는 기존 페이지 번호보다 +1, size는 15
        }
        if (ref.scrollTop < -50) {
            //스크롤이 맨 아래가 아닌 경우 프리뷰 버튼, 버튼 클릭하면 pageDown함수 실행
        }
        if (ref.scrollTop > - 10) {
            //스크롤이 맨 아래가 아닌 경우 프리뷰 제거?
        }
    }

    const pageDown = () => {
        const ref = chatsRef.current;
        ref.scrollTop = 0;
    };
    

    return (
        <div>
            <h2>채팅 카테고리 = {categoryId}</h2>
            <div>           
            {recentPage.length > 0 ? (
            // <ul>
            //     {recentPage.map((chatlog) => ( 
            //         <li key={chatlog.chatlogId}>
            //             <img src={chatlog.profileUrl} alt="profile" />
            //             <span>{chatlog.nickname}: </span>
            //             <span>{chatlog.content}</span>
            //             <span> ({new Date(chatlog.regDate).toLocaleString()})</span>
            //         </li>
            //     ))}
            // </ul>
            <div ref={chatsRef}></div>
                        ) : (
                            <p>채팅이 존재하지 않습니다.</p>
                        )}
            </div>
            <div>
                {
                    isLogin === true ?
                    <div>
                    {/* <form name="chatform" > */}
                        <textarea name="chat-insert" id="chatContent" placeholder="채팅을 입력해주세요" value={chatContent} onChange={(e) => setChatContent(e.target.value)} required></textarea>
                        <button type="submit" onClick={sendChat}>submit</button>
                    {/* </form> */}
                    </div>
                    :
                    <div>
                        로그인이 필요한 서비스입니다.
                    </div>
                }
            </div>
        </div>
    );
};

export default ChatRoom;
