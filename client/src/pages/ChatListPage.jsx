import React, { useState, useEffect } from "react";
import { ChatApi } from "../util/chat-axios";
import ChatPreview from "../components/ChatPreview";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const navigate = useNavigate();

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

  const navigateToChatRoom = (categoryid) => {
    console.log(categoryid);
    navigate(`/chat/room/${categoryid}`, {
      state: {
        categoryid,
      }
    });
};

  return (
  <div className="h-[calc(100%_-_64px)] text-white">
    <div id="chat-list">
      <ul>
          {categories.map((category) => (
            <li key={category.categoryName} className="p-4 bg-white shadow-md mb-2 rounded-lg">
              <h2>{category.categoryName} 채팅방</h2>
              <ChatPreview categoryid={category.categoryId}/>
              <button onClick={() => navigateToChatRoom(category.categoryId)}>채팅방 이동</button>
            </li>
          ))}
        </ul>
    </div>  
  </div>
  );
};

export default ChatList;
