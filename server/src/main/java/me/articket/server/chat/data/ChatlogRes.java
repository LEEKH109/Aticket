package me.articket.server.chat.data;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.articket.server.chat.domain.Chatlog;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ChatlogRes {

    private Long chatlogId;

    private String nickname;

    private String profileUrl;

    private String content;

    private LocalDateTime regDate;

    @Setter
    private String message;

    public static ChatlogRes of(Chatlog chatlog) {
        ChatlogRes chatlogRes = new ChatlogRes();
        chatlogRes.chatlogId = chatlog.getId();
        chatlogRes.nickname = chatlog.getUser().getNickname();
        chatlogRes.profileUrl = chatlog.getUser().getProfileUrl();
        chatlogRes.content = chatlog.getContent();
        chatlogRes.regDate = chatlog.getRegDate();
        return chatlogRes;
    }

}
