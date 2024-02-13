package me.articket.server.chat.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.art.data.ArtCategory;
import me.articket.server.chat.domain.ChatlogDTO;
import me.articket.server.user.domain.User;
import me.articket.server.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import java.util.List;
import java.util.Optional;

import me.articket.server.chat.data.ChatlogRes;
import me.articket.server.chat.domain.Chatlog;
import me.articket.server.chat.service.ChatService;
import me.articket.server.common.response.SuccessResponse;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatlogController {

    private final ChatService chatService;
    private final UserRepository userRepository;

    @MessageMapping("/{category}") //프론트에서 채팅 보낼때는 setApplicationDestinationPrefixes에 따라 /chat/send/{category}로 보냄
    @SendTo("/{category}") //enableSimpleBroker 때문에 /room/{category}를 구독한 사람은 해당 채팅을 받는다
    public SuccessResponse<ChatlogRes>  handleWebSocketChat(@DestinationVariable ArtCategory category, @Payload ChatlogDTO chatlogDTO) {
        System.out.println("category:"+category+", chatlog: "+chatlogDTO.getUserId()+"가 "+chatlogDTO.getContent()+"라고 보냄");
        Optional<User> optionalUser = userRepository.findById(chatlogDTO.getUserId());
        User user = optionalUser.get();
        Chatlog chatlog = new Chatlog();
        chatlog.setUser(user);
        chatlog.setCategory(category);
        chatlog.setContent(chatlogDTO.getContent());
        chatlog.setRegDate(chatlogDTO.getRegDate());
        chatService.saveChatlog(chatlog);

        ChatlogRes chatlogRes = ChatlogRes.of(chatlog);
        return new SuccessResponse<>(chatlogRes);
    }

    @GetMapping("/preview/{category}")
    public SuccessResponse<List<ChatlogRes>> getRecentChatlogsForPreview(@PathVariable ArtCategory category) {
        return new SuccessResponse<>(chatService.findTop5ByCategory(category));
    }

    @GetMapping("/room/{category}")
    public SuccessResponse<Page<ChatlogRes>> getChatlogsByCategoryWithPaging(@PathVariable ArtCategory category, @RequestParam int page) {
        Page<ChatlogRes> chatlogs = chatService.getChatlogs(category, page, 15);
        System.out.println(page+" "+chatlogs.getContent());
        return new SuccessResponse<>(chatlogs);
    }
}
