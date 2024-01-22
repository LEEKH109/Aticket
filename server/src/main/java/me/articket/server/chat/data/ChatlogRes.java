package me.articket.server.chat.data;

import lombok.Data;
import lombok.NoArgsConstructor;
import me.articket.server.chat.domain.Chatlog;
import me.articket.server.user.domain.User;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ChatlogRes {

    private String nickname;

    private String profileUrl;

    private String content;

    private LocalDateTime regDate;

    public static ChatlogRes of(Chatlog chatlog) {
        ChatlogRes chatlogRes = new ChatlogRes();
        chatlogRes.nickname = chatlog.getUser().getNickname();
        chatlogRes.profileUrl = chatlog.getUser().getProfileUrl();
        chatlogRes.content = chatlog.getContent();
        chatlogRes.regDate = chatlog.getRegDate();
        return chatlogRes;
    }

}
