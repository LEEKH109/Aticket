package me.articket.server.chat.service;

import lombok.RequiredArgsConstructor;
import me.articket.server.art.data.ArtCategory;
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
@RequiredArgsConstructor
public class ChatService {

    private final ChatlogRepository chatlogRepository;
    
    public void saveChatlog(Chatlog chatlog) {
        chatlogRepository.save(chatlog);
    }

    public List<ChatlogRes> findTop4ByCategory(ArtCategory category) {
        List<Chatlog> chatlogs = chatlogRepository.findByCategoryOrderByRegDateDesc(category);
        return chatlogs.stream()
                .limit(4)
                .map(ChatlogRes::of)
                .toList();
    }

    public Page<ChatlogRes> getChatlogs(ArtCategory category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("regDate").descending());
        Page<Chatlog> chatlogs = chatlogRepository.findByCategoryOrderByRegDateDesc(category, pageable);
        return chatlogs.map(ChatlogRes::of);
    }

}
