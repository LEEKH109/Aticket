package me.articket.server.chat.data;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.articket.server.art.data.ArtCategory;
import me.articket.server.chat.domain.Chatlog;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ChatlogRes {

    private Long chatlogId;

    private Long userId;

    private String nickname;

    private ArtCategory category;

    private String content;

    private LocalDateTime regDate;

    public static ChatlogRes of(Chatlog chatlog) {
        ChatlogRes chatlogRes = new ChatlogRes();
        chatlogRes.chatlogId = chatlog.getId();
        chatlogRes.userId = chatlog.getUser().getId();
        chatlogRes.nickname = chatlog.getUser().getNickname();
        chatlogRes.category = chatlog.getCategory();
        chatlogRes.content = chatlog.getContent();
        chatlogRes.regDate = chatlog.getRegDate();
        return chatlogRes;
    }

}
