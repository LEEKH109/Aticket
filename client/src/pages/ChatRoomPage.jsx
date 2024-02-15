import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ChatApi } from "../util/chat-axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { LoginContext } from "../components/LoginContext";
import IconButton from "@mui/material/IconButton";

const useGlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
        ::-webkit-scrollbar {
          display: none; /* Hide scrollbar for Chrome, Safari and Opera */
        }
        * {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        /* Hide scrollbar for IE, Edge, and Firefox */
        *::-webkit-scrollbar {
          display: none;
        }
      `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
};

const ChatRoom = () => {
  useGlobalStyles();
  const { isLogin, userId } = useContext(LoginContext);
  const { category } = useParams();
  const [chatContent, setChatContent] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const initialPage = location.state?.page ?? 0;

  const [pins, setPins] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMoreLogs, setHasMoreLogs] = useState(true);

  const chatAreaRef = useRef(null);
  const client = useRef(null);
  const [nowLoginUser, setNowLoginUser] = useState("");
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

  const getCategoryName = (category) => {
    const categoryObj = categories.find((cat) => cat.category === category);
    return categoryObj ? categoryObj.name : category;
  };

  const categoryGradientColors = {
    SHOW: "from-blue-500 to-purple-500",
    MUSICAL: "from-blue-500 to-teal-400",
    PLAY: "from-purple-500 to-pink-500",
  };

  const getCategoryGradient = (category) => {
    return categoryGradientColors[category];
  };

  const handleBackClick = () => {
    navigate("/chat");
  };

  const fadeInClass = "animate-fadeIn";

  const onChatlogReceived = (message) => {
    const newChatlog = JSON.parse(message.body).data;
    console.log(newChatlog);
    setPins((prevPins) => [...prevPins, newChatlog]);
    if (chatAreaRef.current) {
      const chatArea = chatAreaRef.current;
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  };

  const fetchPins = async () => {
    if (!hasMoreLogs || loading) return;
    setLoading(true);
    try {
      const response = await ChatApi.chatScroll(category, page);
      const newPins = response.data.data.content.sort(
        (a, b) => a.chatlogId - b.chatlogId
      );
      setPins((prevPins) => [...newPins, ...prevPins]);
      setHasMoreLogs(newPins.length === 15);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPins();
    if (chatAreaRef.current) {
      const chatArea = chatAreaRef.current;
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  }, [pins, page]);

  useEffect(() => {
    const target = chatAreaRef.current?.lastChild;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreLogs) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [loading, hasMoreLogs, pins]);

  useEffect(() => {
    const connect = () => {
      const stompClient = Stomp.over(
        () => new SockJS("http://i10a704.p.ssafy.io:8081/ws")
      );
      stompClient.connect(
        {},
        () => {
          stompClient.subscribe(`/room/${category}`, onChatlogReceived);
        },
        (error) => {
          console.error("Connection error: ", error);
        }
      );
      client.current = stompClient;
    };

    if (!client.current) {
      connect();
    }

    return () => {
      client.current?.disconnect();
    };
  }, [category]);

  const loadMore = () => {
    if (!loading && hasMoreLogs) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (isLogin) {
      setNowLoginUser(userId);
    }
  }, [isLogin, userId]);

  const sendChat = async (event) => {
    event.preventDefault();
    if (client.current && chatContent.trim()) {
      try {
        const chatlog = {
          userId: Number(nowLoginUser),
          category: category,
          content: chatContent,
          regDate: new Date().toISOString(),
        };
        client.current.send(
          `/app/send/${category}`,
          {},
          JSON.stringify(chatlog)
        );
        setChatContent("");
      } catch (error) {
        console.error("유저정보 가져오기 실패", error);
      }
    }
  };

  return (
    <div>
      <div className="mb-2.5">
        <div
          className={`flex items-center py-3 shadow-md bg-gradient-to-r ${getCategoryGradient(
            category
          )}`}
        >
          <IconButton onClick={handleBackClick} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </IconButton>
          <h1 className="text-xl font-bold text-center text-white">
            &nbsp;&nbsp;{getCategoryName(category)} 단체 채팅방
          </h1>
        </div>
        <div
          ref={chatAreaRef}
          className="overflow-auto mb-4 mx-4"
          style={{ height: "calc(100svh - 196px)" }}
        >
          {pins.length > 0 ? (
            pins.map((chatlog) => (
              <div
                key={chatlog.chatlogId}
                className={`flex ${
                  chatlog.userId === Number(nowLoginUser)
                    ? "justify-end"
                    : "justify-start"
                } mb-4 ${fadeInClass}`}
              >
                <div className="max-w-md">
                  {chatlog.userId !== Number(nowLoginUser) && (
                    <div className="mb-1">
                      <span className="text-sm font-semibold text-gray-800">
                        {chatlog.nickname}
                      </span>
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-lg ${
                      chatlog.userId === Number(nowLoginUser)
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    } w-80`}
                  >
                    <p className="break-words">{chatlog.content}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">
                      {new Date(chatlog.regDate).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              채팅이 존재하지 않습니다.
            </p>
          )}
        </div>
        {isLogin ? (
          <div className="flex items-center px-4">
            <textarea
              className="flex-1 py-2 px-4 bg-white border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out resize-none"
              placeholder="채팅을 입력해주세요"
              value={chatContent}
              onChange={(e) => setChatContent(e.target.value)}
              maxLength="100"
              required
              rows="1"
            ></textarea>
            <button
              type="submit"
              onClick={sendChat}
              className="ml-3 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-150 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </button>
          </div>
        ) : (
          <div className="bg-gray-200 h-[5.25vh] w-full rounded-lg text-gray-500 text-center flex justify-center items-center">
            로그인이 필요한 서비스입니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
