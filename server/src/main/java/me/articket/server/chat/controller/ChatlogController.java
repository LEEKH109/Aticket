package me.articket.server.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import java.util.List;
import me.articket.server.chat.data.ChatlogRes;
import me.articket.server.chat.domain.Chatlog;
import me.articket.server.chat.service.ChatService;
import me.articket.server.common.response.SuccessResponse;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatlogController {

    private final ChatService chatService;

    @MessageMapping("/send/{categoryId}")
    @SendTo("/room/{categoryId}")
    public SuccessResponse<ChatlogRes>  handleWebSocketChat(@DestinationVariable int categoryId, @Payload Chatlog chatlog) {
        chatService.saveChatlog(chatlog);
        ChatlogRes chatlogRes = ChatlogRes.of(chatlog);
        return new SuccessResponse<>(chatlogRes);
    }

    @GetMapping("/preview/{categoryId}")
    public SuccessResponse<List<ChatlogRes>> getRecentChatlogsForPreview(@PathVariable int categoryId) {
        return new SuccessResponse<>(chatService.findTop5ByCategoryId(categoryId));
    }

    @GetMapping("/room/{categoryId}")
    public SuccessResponse<List<ChatlogRes>> getChatlogsByCategoryWithPaging(@PathVariable int categoryId) {
        return new SuccessResponse<>(chatService.findTop15ByCategoryId(categoryId));
    }

    @GetMapping("/paging/{categoryId}")
    public SuccessResponse<Page<ChatlogRes>> getChatlogsByCategoryWithPaging(@PathVariable int categoryId, @PageableDefault(sort = "regDate", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ChatlogRes> chatlogs = chatService.getChatlogs(categoryId, pageable.getPageNumber(), pageable.getPageSize());
        return new SuccessResponse<>(chatlogs);
    }
}
