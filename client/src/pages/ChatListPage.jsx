import { useState, useEffect } from "react";  // React의 상태 관리 및 사이드 이펙트 관리를 위한 훅을 가져옵니다.  
import { ChatApi } from "../util/chat-axios"; // 채팅 관련 데이터를 요청하기 위한 Axios 인스턴스를 가져옵니다.
import ChatPreview from "../components/ChatPreview";
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';

const ChatList = () => {
  //const [상태, 함수] = userState(초기값)
  const [categoryId, setCategoryId] = useState([1,2,3]);
  const [chatPreview, setChatPreview] = useState([]);
  // List<List<ChatlogRes>> 로 응답
  var stompClient = null;
  function onConnected() {
    stompClient.subscribe('/chat'); //chat에 접근한다는 건 토픽 구독과 같다
  }
  function onError(error) {
    //오류가 발생했다고 document.querySelector의 textContent에 넣기
    console.error(error);
  }
  useEffect(()=>{
    categoryId.forEach(async (categoryId) => {
      try {
        await ChatApi.getLatestChatlogByCategory(categoryId);
      } catch (error) {
        if (error.response && error.response.status === 'CustomExceptionCode') {
          // // WebSocket 연결 함수 호출
          // var socket = new SockJS('/ws'); 
          // stompClient = Stomp.over(socket);
          // stompClient.connect({},onConnected, onError);
          const msg = "채팅이 아직 없다"
          console.log(msg);
        }
    }});
  }, [categoryId]);

  return (
  <div className="h-[calc(100%_-_64px)] text-white">
    <div>
    <ul>
          {categoryId.map((id) => (
            <li key={id} className="p-4 bg-white shadow-md mb-2 rounded-lg">
              <ChatPreview categoryId={id} />
            </li>
          ))}
        </ul>
    </div>  
  </div>
  );
};

export default ChatList;
