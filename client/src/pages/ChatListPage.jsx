import { useState, useEffect } from "react";  // React의 상태 관리 및 사이드 이펙트 관리를 위한 훅을 가져옵니다.  
import { ChatApi } from "../util/chat-axios"; // 채팅 관련 데이터를 요청하기 위한 Axios 인스턴스를 가져옵니다.
import ChatPreview from "../components/ChatPreview";
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';

const ChatList = () => {
  const categories = [
    {
      categoryId: 1,
      categoryName: "show"
    },
    {
      categoryId: 2,
      categoryName: "play"
    },
    {
      categoryId: 3,
      categoryName: "musical"
    }
  ];
  
  let stompClient = null;

  function onConnected() {
    stompClient.subscribe('/chat'); //chat에 접근한다는 건 토픽 구독과 같다
  }

  useEffect(() => {
    onConnected;
  }, [stompClient]);


  function onError(error) {
    //오류가 발생했다고 document.querySelector의 textContent에 넣기
    console.error(error);
  }

  return (
  <div className="h-[calc(100%_-_64px)] text-white">
    <div>
      <ul>
          {categories.map((category) => (
            <li key={category.categoryId} className="p-4 bg-white shadow-md mb-2 rounded-lg">
              <h2>{category.categoryName} 채팅방</h2>
              <ChatPreview categoryId={category.categoryId}/>
            </li>
          ))}
        </ul>
    </div>  
  </div>
  );
};

export default ChatList;
