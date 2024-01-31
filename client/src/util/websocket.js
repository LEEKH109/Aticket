import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


// var stompClient = null;

// export function connectWebSocket(event) {
//     //유저 로그인 상태 물어보기

//     //만약 로그인 상태라면: 채팅 입력 창 보여줌.
//     //비로그인이라면: 로그인 후 이용 가능 안내 띄움
//     // //필요에 따라 classList.add 또는 classList.remove 'hidden'
//     // var socket = new SockJS('/ws'); //서버 연결
//     //근데 우리꺼는 한번 채팅 시작하면 열어둘꺼니까 latest 가 비어있다면 그때만 생성. 
//     stompClient = Stomp.over(socket); //STOMP 클라이언트 생성. SockJS 연결로 STOMP 통신 설정 
//     stompClient.connect({},onConnected, onError);
//     event.preventDefault();
// }

// function onConnected() {
//     stompClient.subscribe('/chat'); //chat에 접근한다는 건 토픽 구독과 같다
// }

// function onError(error) {
//     //오류가 발생했다고 document.querySelector의 textContent에 넣기
//     console.error(error);
// }

// // function sendChat(event) {
// //     // var chatContent = Chat input form에서 받은 value.trim();
// //     // if (chatContent && stompClient) {
// //     //     var chatlog = {
// //     //      chatlog 에 들어가는 친구들 다 넣어서 객체 만들고
// //     // }
// //     // stompClient.send("/chat/{categoryId}/send", {}, JSON.stringify(chatlog));
// //     // input form에서 받은 거의 value =''; 다시 비운다
// //     // }
// //     event.preventDefault();
// // }

// // function onChatReceived(payload) {
// //     var chatlog = JSON.parse(payload.body);
// //     var chatlogElement = document.createElement('li');
// //     var avatarElement
// // }
