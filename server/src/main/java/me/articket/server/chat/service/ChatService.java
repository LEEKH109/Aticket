package me.articket.server.chat.service;

import lombok.RequiredArgsConstructor;
import me.articket.server.chat.data.ChatlogRes;
import me.articket.server.chat.domain.Chatlog;
import me.articket.server.chat.repository.ChatlogRepository;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatlogRepository chatlogRepository;

    public Chatlog saveChatlog(Chatlog chatlog) {
        return chatlogRepository.save(chatlog);
    }

    //특정 카테고리의 최신 채팅 1개 불러오기
    public ChatlogRes getLatestChatlogByCategory(int categoryId) {
        Optional<Chatlog> optionalChatlog = chatlogRepository.findTopByCategoryIdOrderByCreatedDateDesc(categoryId);
        if (optionalChatlog.isEmpty()) {
            throw new CustomException(ErrorCode.CHATLOG_NOT_FOUND);
        }
        return ChatlogRes.of(optionalChatlog.get());
    }

    //최근 채팅 5개 불러오기
    public List<ChatlogRes> getRecentChatlogsForPreview(int categoryId) {
        List<Chatlog> chatlogs = chatlogRepository.findTop5ByCategoryIdOrderByCreatedDateDesc(categoryId);
        return chatlogs.stream().map(ChatlogRes::of).collect(Collectors.toList());
    }

    //최근 채팅 10개 불러오기 (페이징)
    public List<ChatlogRes> getChatlogsByCategoryWithPaging(int categoryId, Pageable pageable) {
        Page<Chatlog> chatlogPage = chatlogRepository.findByCategoryIdOrderByCreatedDateDesc(categoryId, pageable);
        return chatlogPage.getContent().stream().map(ChatlogRes::of).collect(Collectors.toList());
    }


}
