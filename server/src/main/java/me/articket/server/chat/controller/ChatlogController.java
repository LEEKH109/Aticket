package me.articket.server.chat.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.chat.data.ChatlogRes;
import me.articket.server.chat.domain.Chatlog;
import me.articket.server.chat.service.ChatService;
import me.articket.server.common.response.SuccessResponse;

import org.springframework.data.domain.Pageable;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatlogController {

    private final ChatService chatService;

    @MessageMapping("/{categoryId}/send")
    @SendTo("/{categoryId}/paging")
    public SuccessResponse<Chatlog>  handleWebSocketChat(@DestinationVariable int categoryId, @Payload Chatlog chatlog) {
        chatService.saveChatlog(chatlog); // DB에 저장
        return new SuccessResponse<>(chatlog); // WebSocket을 통해 다른 클라이언트에 전송
    } //ChatRoomPage에 있는 ChatInputFrom component에서 요청을 하면 받는 곳

    @GetMapping("/{categoryId}/latest")
    public SuccessResponse<ChatlogRes> getLatestChatlogByCategory(@PathVariable int categoryId) {
        return new SuccessResponse<>(chatService.getLatestChatlogByCategory(categoryId));
    } //ChatRoomListPage에서 요청을 보내면 받는 곳.

    @GetMapping("/{categoryId}/preview")
    public SuccessResponse<List<ChatlogRes>> getRecentChatlogsForPreview(@PathVariable int categoryId) {
        return new SuccessResponse<>(chatService.getRecentChatlogsForPreview(categoryId, 5));
    } //DetailPage에 있는 chatpreview component에서 요청을 보내면 받는 곳.

    @GetMapping("/{categoryId}/paging")
    public SuccessResponse<List<ChatlogRes>> getChatlogsByCategoryWithPaging(@PathVariable int categoryId, Pageable pageable) {
        return new SuccessResponse<>(chatService.getChatlogsByCategoryWithPaging(categoryId, pageable));
    } //ChatRoomPage에서 요청을 보내면 받는 곳

    @GetMapping("")
    public SuccessResponse<List<List<ChatlogRes>>> getChatlogsByCategoryWithPaging() {
        List<List<ChatlogRes>> res = null;
        for (int i = 0; i < 3; i++) {
            List<ChatlogRes> room = chatService.getRecentChatlogsForPreview(i, 10);
            res.add(room);
        }
        return new SuccessResponse<>(res);
    } //ChatListPage에서 요청을 보내면 받는 곳

}
