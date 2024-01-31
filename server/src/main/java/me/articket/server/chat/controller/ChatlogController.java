package me.articket.server.chat.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.chat.data.ChatlogRes;
import me.articket.server.chat.domain.Chatlog;
import me.articket.server.chat.service.ChatService;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatlogController {

    private final ChatService chatService;

    @MessageMapping("/{categoryId}/send")
    @SendTo("/{categoryId}/paging")
    public Chatlog handleWebSocketChat(@DestinationVariable int categoryId, @Payload Chatlog chatlog) {
        chatService.saveChatlog(chatlog); // DB에 저장
        return chatlog; // WebSocket을 통해 다른 클라이언트에 전송
    } //ChatRoomPage에 있는 ChatInputFrom component에서 요청을 하면 받는 곳

    @GetMapping("/{categoryId}/latest")
    public ChatlogRes getLatestChatlogByCategory(@PathVariable int categoryId) {
        return chatService.getLatestChatlogByCategory(categoryId);
    } //ChatRoomListPage에서 요청을 보내면 받는 곳.

    @GetMapping("/{categoryId}/preview")
    public List<ChatlogRes> getRecentChatlogsForPreview(@PathVariable int categoryId) {
        return chatService.getRecentChatlogsForPreview(categoryId, 5);
    } //DetailPage에 있는 chatpreview component에서 요청을 보내면 받는 곳.

    @GetMapping("/{categoryId}/paging")
    public List<ChatlogRes> getChatlogsByCategoryWithPaging(@PathVariable int categoryId, Pageable pageable) {
        return chatService.getChatlogsByCategoryWithPaging(categoryId, pageable);
    } //ChatRoomPage에서 요청을 보내면 받는 곳

    @GetMapping("/")
    public List<List<ChatlogRes>> getChatlogsByCategoryWithPaging() {
        List<List<ChatlogRes>> res = null;
        for (int i = 0; i < 3; i++) {
            List<ChatlogRes> room = chatService.getRecentChatlogsForPreview(i, 10);
            res.add(room);
        }
        return res;
    } //ChatListPage에서 요청을 보내면 받는 곳

}
