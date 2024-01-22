package me.articket.server.chat.service;

import lombok.RequiredArgsConstructor;
import me.articket.server.chat.data.ChatlogRes;
import me.articket.server.chat.domain.Chatlog;
import me.articket.server.chat.repository.ChatRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    //1개 불러오기
    public ChatlogRes getChatlog(Long id) {
        Optional<Chatlog> optionalChatlog = chatRepository.findById(id);
        //에러 예외처리
        Chatlog chatlog = optionalChatlog.get();
        return ChatlogRes.of(chatlog);
    }

//    //목록 불러오기
//    public List<ChatlogRes> getChatlogList() {
//        return List
//    }

}
