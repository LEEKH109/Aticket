import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ChatApi } from "../util/chat-axios";
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

  const onChatlogReceived = (message) => {
    const newChatlog = JSON.parse(message.body);
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
      setPins((prevPins) => [...prevPins, ...newPins.reverse()]);
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
    //   let headers = {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`};
      stompClient.connect({}, () => {
        stompClient.subscribe(`/room/${category}`, onChatlogReceived);
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

  const sendChat = async (event) => {
    event.preventDefault();
    if (client.current && chatContent.trim()) {
      const chatlog = {
        userId: userId,
        category: category,
        content: chatContent,
        regDate: new Date().toISOString(),
      };
      console.log("전송할 채팅: ")
      console.log(chatlog)
      let headers = {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`};
      client.current.send(`/chat/send/${category}`, headers , JSON.stringify(chatlog));
      setChatContent("");
      console.log("채팅 보내짐")
    }
  };

  return (
    <div>
      <h1 className="font-bold">{category} 단체 채팅방</h1>
      <div ref={chatAreaRef} className="flex flex-col-reverse overflow-auto" style={{ height: 'calc(100vh - 150px)' }}>
        {pins.length > 0 ? (
          pins.map((chatlog) => (
            <div key={chatlog.chatlogId} className={`flex ${chatlog.userId === userId ? 'justify-end' : 'justify-start'} items-start gap-2.5`}>
              <div className="flex flex-col gap-1 w-full max-w-[320px]">
                {chatlog.userId !== userId && (
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{chatlog.nickname}</span>
                  </div>
                )}
                <div className={`flex flex-col leading-1.5 p-4 ${chatlog.userId === userId ? 'border-blue-300 bg-blue-100 rounded-l-xl rounded-br-xl dark:bg-blue-600' : 'border-gray-200 bg-gray-100 rounded-r-xl rounded-bl-xl dark:bg-gray-700'}`}>
                  <p className="text-sm font-normal text-gray-900 dark:text-white">{chatlog.content}</p>
                </div>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{new Date(chatlog.regDate).toLocaleString()}</span>
              </div>
            </div>
          ))
        ) : (
          <p>채팅이 존재하지 않습니다.</p>
        )}
      </div>
      <div>
        {isLogin ? (
          <div>
            <textarea name="chat-insert" id="chatContent" className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700" placeholder="채팅을 입력해주세요" value={chatContent} onChange={(e) => setChatContent(e.target.value)} maxLength="100" required></textarea>
            <button type="submit" onClick={sendChat}>submit</button>
          </div>
        ) : (
          <div>로그인이 필요한 서비스입니다.</div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
