package me.articket.server.user.data;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NicknameRes {

    private Long userId;

    private String nickname;

    public NicknameRes(Long userId, String nickname) {
        this.userId=userId;
        this.nickname=nickname;
    }
}
