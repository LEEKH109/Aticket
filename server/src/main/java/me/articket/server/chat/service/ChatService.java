package me.articket.server.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import me.articket.server.chat.data.ChatlogRes;
import me.articket.server.chat.domain.Chatlog;
import me.articket.server.chat.repository.ChatlogRepository;

@Service
public class ChatService {

    private final ChatlogRepository chatlogRepository;

    public ChatService(ChatlogRepository chatlogRepository) {
        this.chatlogRepository = chatlogRepository;
    }

    public void saveChatlog(Chatlog chatlog) {
        chatlogRepository.save(chatlog);
    }

    public List<ChatlogRes> findTop5ByCategoryId(int categoryId) {
        List<Chatlog> chatlogs = chatlogRepository.findByCategoryIdOrderByRegDateDesc(categoryId);
        return chatlogs.stream()
                .limit(5)
                .map(ChatlogRes::of)
                .toList();
    }

    public List<ChatlogRes> findTop15ByCategoryId(int categoryId) {
        List<Chatlog> chatlogs = chatlogRepository.findByCategoryIdOrderByRegDateDesc(categoryId);
        return chatlogs.stream()
                .limit(15)
                .map(ChatlogRes::of)
                .toList();
    }

    public Page<ChatlogRes> getChatlogs(int categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("regDate").descending());
        Page<Chatlog> chatlogs = chatlogRepository.findByCategoryIdOrderByRegDateDesc(categoryId, pageable);
        return chatlogs.map(ChatlogRes::of);
    }

}
