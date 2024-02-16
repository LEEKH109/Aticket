import React, { useState, useEffect } from "react";
import { ChatApi } from "../util/chat-axios";
import ChatPreview from "../components/ChatPreview";
import { Link, useNavigate, useParams } from "react-router-dom";

const ChatList = () => {
  const navigate = useNavigate();
  let { category, page } = useParams();
  const categories = [
    {
      categoryId: 1,
      category: "SHOW",
      name: "전시",
    },
    {
      categoryId: 2,
      category: "MUSICAL",
      name: "뮤지컬",
    },
    {
      categoryId: 3,
      category: "PLAY",
      name: "연극",
    },
  ];

  return (
    <div>
      <div id="chat-list">
        <ul className="grid grid-rows-3 h-[calc(100svh_-_64px)]">
          {categories.map((art) => (
            <li
              key={art.category}
              className="px-4 py-2 bg-white shadow-md mb-2 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  {art.name} 단체
                  채팅방&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </h2>
                <Link
                  to={`/chat/room/${art.category}?page=${0}`}
                  className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
                >
                  바로가기
                </Link>
              </div>
              <ChatPreview category={art.category} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatList;
