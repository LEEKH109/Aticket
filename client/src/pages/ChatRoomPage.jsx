import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ChatApi } from "../util/chat-axios";
import { UserApi } from "../util/user-axios";
import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';
import { LoginContext } from "../components/LoginContext";

const useGlobalStyles = () => {
    useEffect(() => {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `
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
  const initialPage = location.state?.page ?? 0;

  const [pins, setPins] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMoreLogs, setHasMoreLogs] = useState(true);

  const chatAreaRef = useRef(null);
  const client = useRef(null);
  const [ nowLoginUser, setNowLoginUser ] = useState("");

  const onChatlogReceived = (message) => {
    console.log("새 채팅이 들어왔다");
    console.log("message: ");
    console.log(message);
    const newChatlog = JSON.parse(message.body);
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
      const newPins = response.data.data.content.sort((a, b) => a.chatlogId - b.chatlogId);
    //   setPins((prevPins) => [...prevPins, ...newPins.reverse()]);
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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreLogs) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (chatAreaRef.current?.firstChild && hasMoreLogs) {
      observer.observe(chatAreaRef.current.firstChild);
    }

    return () => observer.disconnect();
  }, [loading, hasMoreLogs]);

  useEffect(() => {
    const connect = () => {
      const stompClient = Stomp.over(() => new SockJS("http://i10a704.p.ssafy.io:8081/ws"));
      stompClient.connect({}, () => {
        stompClient.subscribe(`/room/${category}`, onChatlogReceived);
        console.log("구독");
      }, error => {
        console.error("Connection error: ", error);
      });
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
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(()=>{
    if (isLogin) {
        setNowLoginUser(userId);
    }
  }, [isLogin]);

  const sendChat = async (event) => {
    console.log(nowLoginUser);
    event.preventDefault();
    if (client.current && chatContent.trim()) {
        try {
            // const response = await UserApi.getUserInfo(userId);
            // const user = response.data.data;
            // console.log(user);
            const chatlog = {
                userId: nowLoginUser,
                category: category,
                content: chatContent,
                regDate: new Date().toISOString(),
            };
            console.log("전송할 채팅: ");
            console.log(chatlog);
            client.current.send(`/send/${category}`, {} , JSON.stringify(chatlog));
            setChatContent("");
        } catch (error) {
            console.error("유저정보 가져오기 실패", error);
        }
      
    //   let headers = {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`};
    //   client.current.send(`/chat/send/${category}`, headers , JSON.stringify(chatlog));
    }
  };

  return (
    <div>
        <div>
            <h1 className="text-xl font-bold text-center py-3 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-teal-400 text-white">
            {category} 단체 채팅방
            </h1>
            <div ref={chatAreaRef} className="overflow-auto mb-4" style={{ height: 'calc(100vh - 170px)' }}>
                {pins.length > 0 ? (
                pins.map((chatlog) => (
                <div key={chatlog.chatlogId} className={`flex ${chatlog.userId === userId ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className="max-w-md">
                {chatlog.userId !== userId && (
                <div className="mb-1">
                    <span className="text-sm font-semibold text-gray-800">{chatlog.nickname}</span>
                </div>
                )}
                    <div className={`p-4 rounded-lg ${chatlog.userId === userId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                        <p>{chatlog.content}</p>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-gray-500">{new Date(chatlog.regDate).toLocaleString()}</span>
                    </div>
                </div>
            </div>
            ))
            ) : (
                <p className="text-center text-gray-500">채팅이 존재하지 않습니다.</p>
                )}
            </div>
            {isLogin ? (
            <div className="flex items-center px-4">
                <textarea className="flex-1 py-2 px-4 bg-white border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out resize-none"
                placeholder="채팅을 입력해주세요"
                value={chatContent}
                onChange={(e) => setChatContent(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    sendChat();
                }
            }}
            maxLength="100" required rows="1"></textarea>
            <button type="submit" onClick={sendChat} className="ml-3 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-150 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                </svg>
            </button>
        </div>
            ) : (
                <p className="text-center text-gray-500">로그인이 필요한 서비스입니다.</p>
            )}
            </div>
        </div>
  );
};

export default ChatRoom;
