import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ChatApi } from "../util/chat-axios";
import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';
import { LoginContext } from "../components/LoginContext";
import { UserApi } from "../util/user-axios";

const ChatRoom = () => {
    const { isLogin, userId } = useContext(LoginContext);
    let {category} = useParams();
    const [chatContent, setChatContent] = useState("");
    // const [chatlogs, setChatlogs] = useState([]);
    const location = useLocation();
    const initialPage = location.state?.page??0;

    // const chatlog = {
    //     nickname: userId,
    //     category: category,
    //     content: chatContent,
    //     regDate: new Date(),
    // };

    const [pins, setPins] = useState([]); //처음 chatlog부터 이어져야 하니 => 데이터를 담고 있는 state인 pins를 operator 연산자로 복제
    const [page, setPage] = useState(initialPage);//스크롤이 닿았을 때 새롭게 데이터 페이지를 바꾸는 state
    const [loading, setLoading] = useState(false); //로딩 성공 여부 state  
    const pageEnd = useRef(null);

    const loadMore = () => {
        setPage(prev => prev + 1);
    } //페이지 넘버 바꾸기

    const token = useContext(LoginContext);
    const chatsRef = useRef(null);
    let stompClient = null;


    //chatlogRes.chatlogId = chatlog.getId();
    //chatlogRes.nickname = chatlog.getUser().getNickname();
    //chatlogRes.content = chatlog.getContent();
    //chatlogRes.regDate = chatlog.getRegDate();

    const onChatlogReceived = (payload) => {
        console.log(payload);
        // const newChatlog = JSON.parse(payload.body); // 서버로부터 받은 데이터를 파싱
        // const chatlogElement = document.createElement('li');
        
        // chatlogElement.classList.add('chat-message'); // 채팅 메시지에 대한 CSS 클래스 추가
    
        // // 사용자 닉네임을 표시하는 요소 생성
        // const usernameElement = document.createElement('span');
        // usernameElement.textContent = newChatlog.nickname; // 사용자 닉네임 사용
        // chatlogElement.appendChild(usernameElement);
    
        // // 채팅 메시지 내용을 표시하는 요소 생성
        // const textElement = document.createElement('p');
        // textElement.textContent = newChatlog.content; // 채팅 내용 사용
        // chatlogElement.appendChild(textElement);
    
        // // 메시지 등록 날짜를 포맷팅하여 표시
        // const dateElement = document.createElement('span');
        // dateElement.textContent = new Date(newChatlog.regDate).toLocaleString(); // 'regDate'를 포맷팅하여 사용
        // chatlogElement.appendChild(dateElement);
    
        // // 채팅 메시지를 채팅 영역에 추가하고 스크롤 조정
        // chatArea.appendChild(chatlogElement);
        // chatArea.scrollTop = chatArea.scrollHeight; // 새 메시지가 추가될 때마다 스크롤을 아래로 이동
    };


    const fetchPins = async () => {
        setLoading(true);
        try {
            const response = await ChatApi.chatScroll(category,page);
            const newPins = response.content || [];
            setPins(prev => [...prev, ...newPins]);
        } catch (error) {
            console.error(error);
        }
        // console.log("page:"+page);
        // console.log("response"+response);
        // setPins(prev => [...prev, ...response.pins]); //pin 
        setLoading(false);
    } //pin 을 복제해서 축적하는 함수

    useEffect(()=>{
        // setPage(location.search.slice(6))
        fetchPins(page);
    }, [page]);  //page 넘버 바뀔 때마다 pin 을 복제해서 축적

    useEffect(()=>{
        if (loading) {
            const observer = new IntersectionObserver(
                entries => {
                    if (entries[0].isIntersecting) {
                        loadMore();
                    }
                },
                { threshold: 1}
            );
            observer.observe(pageEnd.current);
        }
    },[loading]);

    useEffect(()=>{
        const connect = () => {
            stompClient = Stomp.over(function(){
                return new SockJS("http://localhost:8080/ws");
            })
            stompClient.connect({"token" : token },()=> {
                onConnected(category);
            }, onError);
        };

        const onConnected = (category) => {
            stompClient.subscribe(`/chat/room/${category}`, onChatlogReceived);
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


        
        
        return()=>{
            if (stompClient && stompClient.connected) {
                // stompClient.disconnect();
                stompClient.disconnect(() => {
                    console.log('Disconnected on component unmount.');
                });
            }
        }
    }, [category,token])

    // useEffect(() => {
    //     setPins(ChatApi.chatScroll(categoryId,page));   
    // }, [chatsRef]);

    const sendChat = async (event) => {
        event.preventDefault(); // Form의 기본 제출 동작 방지

        const user = {
            
        }

        const chatlog = {
            user: userId,
            category: category,
            content: chatContent,
            regDate: new Date(),
        };
        console.log(chatlog);

        try {
            const response = await ChatApi.sendChatlog(category, chatlog);
            onChatlogReceived(response);
        } catch (error) {
            console.error("채팅 전송 실패:", error);
        }
        setChatContent("");
    };

    return (
        <div>
            <h2>{category} 단체 채팅방</h2>
            <div ref={pageEnd}/>
            <div>           
            {pins.length > 0 ? (
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
            <div></div>
            <div>
                {
                    isLogin === true ?
                    <div>
                        <textarea name="chat-insert" id="chatContent" className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700" placeholder="채팅을 입력해주세요" value={chatContent} onChange={(e) => setChatContent(e.target.value)} maxLength="100" required></textarea>
                        <button type="submit" onClick={sendChat}>submit</button>
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
