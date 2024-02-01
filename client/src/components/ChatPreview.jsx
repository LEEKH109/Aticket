// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ChatApi } from "../util/chat-axios"; // 채팅 관련 데이터를 요청하기 위한 Axios 인스턴스를 가져옵니다.
// import SockJS from "sockjs-client";
// import Stomp from 'stompjs';


// const ChatPreview = ({categoryId}) => {
//     const [chatPreviews, setChatPreviews] = useState([]);
//     const [websocketConnected, setWebsocketConnected] = useState(false); // 웹소켓 연결 상태 추가
//     const navigate = useNavigate();
//     const stompClient = new Stomp.Client({
//         brokerURL: 'ws://localhost:5173/chat'
//     });

//     stompClient.activate();

//     // let sockJS = null;

//     useEffect(() => {
//         // 비동기 함수 정의
//         const fetchChatPreviews = async () => {
//             try {
//                 const response = await ChatApi.preview(categoryId);
//                 // const socket = new SockJS('ws://localhost:5173/chat');
//                 if (response.data.length === 0) {
//                     stompClient.activate();
//                     // stompClient = Stomp.over(socket);
//                     // stompClient.connect({}, onConnected, onError);

//                 } else {
//                     setChatPreviews(response.data);
//                 }
//                 setChatPreviews(response.data);
//             } catch (error) {
//                 console.log("채팅 미리보기 화면에 접근 불가", error);//여기
//             }
//         };

//         // 비동기 함수 호출
//         fetchChatPreviews();
//     }, [categoryId]);

//     // const onConnected = () => {
//     //     // sockJS = new SockJS('/ws');
//     //     // stompClient = Stomp.over(SockJS);
//     //     // console.log("WebSocket 연결됨");
//     //     setWebsocketConnected(true); // 웹소켓 연결이 성공하면 상태 업데이트
//     // };

//     // const onError = (error) => {
//     //     console.log("WebSocket 연결 오류", error);
//     // };

//     const navigateToChatRoom = () => {
//         // navigate(`/chat/${categoryId}/paging`);
//         if (websocketConnected) {
//             // 웹소켓 연결이 성공한 경우에만 '/chat'으로 이동
//             navigate(`/chat/${categoryId}/paging`);
//         } else {
//             console.log("웹소켓 연결을 아직 기다리는 중입니다."); //리스트에서 채팅방 입장하려고할때 여기로 옴
//         }
//     };

//     return (
//         <div>
//             <ul>
//                 {chatPreviews.map((preview)=> (
//                     <li key={preview.chatlogId}>
//                         {preview.content}&nbsp;&nbsp;
//                         {preview.user.nickname}
//                         &nbsp;&nbsp;<span>({new Date(preview.regDate).toLocaleString()})</span>
//                     </li>
//                 ))}
//             </ul>
//             <button onClick={navigateToChatRoom}>채팅방 이동</button>
//         </div>
//     )
// };

// export default ChatPreview;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatApi } from "../util/chat-axios";
import Stomp from 'stompjs';

const ChatPreview = ({ categoryId }) => {
    const [chatPreviews, setChatPreviews] = useState([]);
    const [stompClient, setStompClient] = useState(null); // Stomp 클라이언트 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChatPreviews = async () => {
            try {
                const socket = new WebSocket('ws://localhost:5173/');
                const response = await ChatApi.preview(categoryId);

                if (response.data.length === 0) {
                    const stomp = Stomp.over(socket);
                    
                    setStompClient(stomp); // Stomp 클라이언트 설정
                    stompClient.activate();
                } else {
                    setChatPreviews(response.data);
                }
            } catch (error) {
                console.log("채팅 미리보기 화면에 접근 불가", error);
            }
        };

        fetchChatPreviews();
    }, [categoryId]);

    const onConnected = () => {
        console.log("WebSocket 연결됨");
    };

    const onError = (error) => {
        console.log("WebSocket 연결 오류", error);
    };

    const navigateToChatRoom = () => {
        if (stompClient) {
            navigate(`/chat/${categoryId}/paging`);
        } else {
            console.log("웹소켓 연결을 아직 기다리는 중입니다.");
        }
    };

    return (
        <div>
            <ul>
                {chatPreviews.map((preview) => (
                    <li key={preview.chatlogId}>
                        {preview.content}&nbsp;&nbsp;
                        {preview.user.nickname}
                        &nbsp;&nbsp;<span>({new Date(preview.regDate).toLocaleString()})</span>
                    </li>
                ))}
            </ul>
            <button onClick={navigateToChatRoom}>채팅방 이동</button>
        </div>
    )
};

export default ChatPreview;
