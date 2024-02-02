package me.articket.server.chat.service;

import lombok.RequiredArgsConstructor;
import me.articket.server.chat.data.ChatlogRes;
import me.articket.server.chat.domain.Chatlog;
import me.articket.server.chat.repository.ChatlogRepository;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatlogRepository chatlogRepository;

    public void saveChatlog(Chatlog chatlog) {
        chatlogRepository.save(chatlog);
    }//ChatInputFrom component -> controller에서 Chatlog 갖고 옴

    //특정 카테고리의 최신 채팅 1개 불러오기(없으면 반환x)
    public ChatlogRes getLatestChatlogByCategory(int categoryId) {
        Optional<Chatlog> chatlog = chatlogRepository.findTopByCategoryIdOrderByRegDateDesc(categoryId);
        if (chatlog.isEmpty()) {
            throw new CustomException(ErrorCode.CHATLOG_NOT_FOUND);
        }
        return ChatlogRes.of(chatlog.get());
    }

    //최근 채팅 5개 불러오기
    public List<ChatlogRes> getRecentChatlogsForPreview(int categoryId, int count) {
        Pageable pageable = PageRequest.of(0, count);
        Page<Chatlog> preview = chatlogRepository.findByCategoryIdOrderByRegDateDesc(categoryId, pageable);
        return preview.stream().map(ChatlogRes::of).toList();
    } //chatpreview component -> controller에서 categoryId 갖고 옴

    //최근 채팅 10개 불러오기 (페이징)
    public List<ChatlogRes> getChatlogsByCategoryWithPaging(int categoryId, Pageable pageable) {
        Page<Chatlog> chatlogPage = chatlogRepository.findByCategoryIdOrderByRegDateDesc(categoryId, pageable);
        return chatlogPage.stream().map(ChatlogRes::of).toList();
    }
}
