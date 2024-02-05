package me.articket.server.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import me.articket.server.chat.data.ChatlogRes;
import me.articket.server.chat.domain.Chatlog;
import me.articket.server.chat.repository.ChatlogRepository;

@Service
public class ChatService {

    @Autowired
    private ChatlogRepository chatlogRepository;

    public void saveChatlog(Chatlog chatlog) {
        chatlogRepository.save(chatlog);
    }

    public List<ChatlogRes> findTop5ByCategoryId(int categoryId) {
        List<Chatlog> chatlogs = chatlogRepository.findByCategoryIdOrderByRegDateDesc(categoryId);
        return chatlogs.stream()
                .limit(5)
                .map(ChatlogRes::of)
                .collect(Collectors.toList());
    }

    public List<ChatlogRes> findTop10ByCategoryId(int categoryId) {
        List<Chatlog> chatlogs = chatlogRepository.findByCategoryIdOrderByRegDateDesc(categoryId);
        return chatlogs.stream()
                .limit(10)
                .map(ChatlogRes::of)
                .collect(Collectors.toList());
    }
}
