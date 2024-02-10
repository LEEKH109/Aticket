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

    const [pins, setPins] = useState([]); //처음 chatlog부터 이어져야 하니 => 데이터를 담고 있는 state인 pins를 operator 연산자로 복제
    const [page, setPage] = useState(initialPage);//스크롤이 닿았을 때 새롭게 데이터 페이지를 바꾸는 state
    const [loading, setLoading] = useState(false); //로딩 성공 여부 state  
    const pageEnd = useRef(null);
    const [hasMoreLogs, setHasMoreLogs] = useState(true);//추가 로그

    const loadMore = () => {
        setPage(prev => prev + 1);
    } //페이지 넘버 바꾸기

    const token = useContext(LoginContext);
    const chatAreaRef  = useRef(null);
    let stompClient = null;

    const onChatlogReceived = (payload) => {
        console.log(payload); //형식을 보고 밑부분 수정
        
        const newChatlog = JSON.parse(payload.data.body); // 서버로부터 받은 데이터를 파싱??
        const chatlogElement = document.createElement('div');
        chatlogElement.classList.add('cflex items-start gap-2.5'); // 채팅 메시지에 대한 CSS 클래스 추가
    
        const chatlogSubElement = document.createElement('div');
        chatlogSubElement.classList.add('flex flex-col gap-1 w-full max-w-[320px]');
        chatlogElement.appendChild(chatlogSubElement);

        const nicknameElement = document.createElement('div');
        nicknameElement.classList.add('flex items-center space-x-2 rtl:space-x-reverse');
        const nicknameSubElement = document.createElement('span');
        nicknameSubElement.classList.add('text-sm font-semibold text-gray-900 dark:text-white');
        nicknameSubElement.textContent = newChatlog.nickname; // 사용자 닉네임 사용
        nicknameElement.appendChild(nicknameSubElement);
        chatlogSubElement.appendChild(nicknameElement);
    
        const contentElement = document.createElement('div');
        contentElement.classList.add('flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700');
        const contentSubElement = document.createElement('p');
        contentSubElement.classList.add('text-sm font-normal text-gray-900 dark:text-white');
        contentSubElement.textContent = newChatlog.content; // 채팅 내용 사용
        contentElement.appendChild(contentSubElement);
        chatlogSubElement.appendChild(contentElement);
    
        // // 메시지 등록 날짜를 포맷팅하여 표시
        const dateElement = document.createElement('span');
        dateElement.classList.add('text-sm font-normal text-gray-500 dark:text-gray-400');
        dateElement.textContent = new Date(newChatlog.regDate).toLocaleString(); // 'regDate'를 포맷팅하여 사용
        chatlogSubElement.appendChild(dateElement);
    
        chatArea.appendChild(chatlogElement); // 채팅 메시지를 채팅 영역에 추가
        chatArea.scrollTop = chatArea.scrollHeight; // 새 메시지가 추가될 때마다 스크롤을 아래로 이동

    };


    const fetchPins = async () => {
        if (!hasMoreLogs || loading) return; //loading 추가 
        setLoading(true);
        try {
            console.log(page+"페이지 채팅 로그: "+(await ChatApi.chatScroll(category, page)).data.data.content);
            const response = (await ChatApi.chatScroll(category, page)).data.data.content;
            const sortedResponse = response.sort((a, b) => a.chatlogId - b.chatlogId);
            // const newPins = response || [];
            
            setPins(pins => [...sortedResponse, ...pins]);
            setHasMoreLogs(response.length === 15);
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
        // fetchPins(page);
        if (page === initialPage) {
            fetchPins(); // Only fetch on initial load
        }
    }, [page, initialPage]);  //page 넘버 바뀔 때마다 pin 을 복제해서 축적

    useEffect(()=>{
        // if (loading && hasMoreLogs) {
        //     const observer = new IntersectionObserver(
        //         entries => {
        //             if (entries[0].isIntersecting) {
        //                 loadMore();
        //             }
        //         },
        //         { threshold: 1}
        //     );
        //     observer.observe(pageEnd.current);
        //     return () => observer.disconnect(); 
        // }
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );
        if (chatAreaRef.current?.firstChild) {
            observer.observe(chatAreaRef.current.firstChild); // Observe the first child for intersection
        }
        return () => observer.disconnect();
    },[loading,hasMoreLogs]);

    useEffect(()=>{
        const connect = () => {
            stompClient = Stomp.over(function(){
                return new SockJS("http://i10a704.p.ssafy.io:8081/ws");// http://localhost:8080/ws http://i10a704.p.ssafy.io:8081/ws
            })
            stompClient.connect({"token" : token },()=> {
                onConnected(category);
            }, onError);
        };

        const onConnected = (category) => {
            stompClient.subscribe(`/room/${category}`, onChatlogReceived);
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

        const chatlog = {
            user: userId,
            category: category,
            content: chatContent,
            regDate: new Date(),
        };
        console.log(chatlog); //이건 잘 들어감

        const stompHeaders = {
            "Authorization": token,
        };

        stompClient.send(`/chat/send/${category}`,stompHeaders, JSON.stringify(chatlog));
        setChatContent("");
        // if (stompClient && stompClient.connected) {
        //     const chatlog = {
        //         user: userId,
        //         category: category,
        //         content: chatContent,
        //         regDate: new Date(),
        //     };
        //     console.log(chatlog); //이건 잘 들어감

        //     const stompHeaders = {
        //         "Authorization": token,
        //     };

        //     stompClient.send(`/chat/send/${category}`,stompHeaders,stringify(chatlog));
        //     setChatContent("");
        // } else {
        //     console.error('Not connected to WebSocket.')
        // }

        // ChatApi.sendChatlog(category, chatlog).then(res=>console.log(res))
        // ChatApi.sendChatlog(category, chatlog).then(res=>onChatlogReceived(res.data.data).catch(err=>console.error(err)))
        // try {
        //     const response = await ChatApi.sendChatlog(category, chatlog);
        //     onChatlogReceived(response);
        // } catch (error) {
        //     console.error("채팅 전송 실패:", error);
        // }
        setChatContent("");
    };

    return (
        <div>
            <h1 className="font-bold">{category} 단체 채팅방</h1>
            {/* <div ref={chatAreaRef} className="flex flex-col-reverse overflow-auto" style={{ height: 'calc(100vh - 150px)' }}>           
                <div ref={pageEnd}/>
            {pins.length > 0 ? (
            // <ul>
            //     {pins.map((chatlog) => ( 
            //         <li key={chatlog.chatlogId}>
            //             <span>{chatlog.nickname}: </span>
            //             <span>{chatlog.content}</span>
            //             <span> ({new Date(chatlog.regDate).toLocaleString()})</span>
            //         </li>
            //     ))}
            // </ul>
                <div>
                    {pins.map((chatlog) => (
                        <div className="flex items-start gap-2.5">
                            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{chatlog.nickname}</span>
                                </div>
                                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                    <p className="text-sm font-normal text-gray-900 dark:text-white">{chatlog.content}</p>
                                </div>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{new Date(chatlog.regDate).toLocaleString()}</span>
                            </div>                   
                        </div>
                    ))}
                </div> */}
                        <div ref={chatAreaRef} className="flex flex-col-reverse overflow-auto" style={{ height: 'calc(100vh - 150px)' }}>
            {pins.length > 0 ? (
                <div>
                    {pins.map((chatlog) => (
                        <div
                            key={chatlog.chatlogId}
                            className={`flex ${
                                chatlog.userId === userId ? 'justify-end' : 'justify-start'
                            } items-start gap-2.5`}
                        >
                            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                                {chatlog.userId !== userId && ( // If the message is not from the logged-in user, show the nickname
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {chatlog.nickname}
                                        </span>
                                    </div>
                                )}
                                <div
                                    className={`flex flex-col leading-1.5 p-4 ${
                                        chatlog.userId === userId
                                            ? 'border-blue-300 bg-blue-100 rounded-l-xl rounded-br-xl dark:bg-blue-600'
                                            : 'border-gray-200 bg-gray-100 rounded-r-xl rounded-bl-xl dark:bg-gray-700'
                                    }`}
                                >
                                    <p className="text-sm font-normal text-gray-900 dark:text-white">
                                        {chatlog.content}
                                    </p>
                                </div>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    {new Date(chatlog.regDate).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                        ) : (
                            <p>채팅이 존재하지 않습니다.</p>
                        )}
            </div>
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
//<div ref={chatsRef}></div> https://flowbite.com/docs/components/chat-bubble/