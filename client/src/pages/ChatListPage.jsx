import React, { useState, useEffect } from "react";
import { ChatApi } from "../util/chat-axios";
import ChatPreview from "../components/ChatPreview";
import { Link, useNavigate, useParams  } from "react-router-dom";

const ChatList = () => {
  const navigate = useNavigate();
  let { category, page } = useParams();
  const categories = [
    {
      categoryId: 1,
      category: "SHOW"
    },
    {
      categoryId: 2,
      category: "MUSICAL"
    },
    {
      categoryId: 3,
      category: "PLAY"
    }
  ];

//   const navigateToChatRoom = (categoryid) => {
//     console.log(categoryid);
//     navigate(`/chat/room/${categoryid}`, {
//       state: {
//         categoryid,
//       }
//     });
// };

  return (
  <div className="h-[calc(100%_-_64px)] text-white">
    <div id="chat-list">
      <ul>
          {categories.map((art) => (
            <li key={art.category} className="p-4 bg-white shadow-md mb-2 rounded-lg">
              <h2>{art.category} 채팅방</h2>
              <ChatPreview category={art.category}/>
              <Link to={`/chat/room/${art.category}?page=${0}`}>채팅방 바로가기</Link>
            </li>
          ))}
        </ul>
    </div>  
  </div>
  );
};

export default ChatList;

//<Link onClick={() => navigateToChatRoom(category.categoryId)}>채팅방 이동</Link>