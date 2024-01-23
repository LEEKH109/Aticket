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
    @SendTo("/category/{categoryId}")
    public Chatlog sendChat(@DestinationVariable int categoryId, @Payload Chatlog chatlog) {
        return chatService.saveChatlog(chatlog);
    }

    @GetMapping("/{categoryId}/latest")
    public ChatlogRes getLatestChatlogByCategory(@PathVariable int categoryId) {
        return chatService.getLatestChatlogByCategory(categoryId);
    }

    @GetMapping("/{categoryId}/preview")
    public List<ChatlogRes> getRecentChatlogsForPreview(@PathVariable int categoryId) {
        return chatService.getRecentChatlogsForPreview(categoryId);
    }

    @GetMapping("/{categoryId}/paging")
    public List<ChatlogRes> getChatlogsByCategoryWithPaging(@PathVariable int categoryId, Pageable pageable) {
        return chatService.getChatlogsByCategoryWithPaging(categoryId, pageable);
    }

}
