package me.articket.server.user.data;

import lombok.Data;
import lombok.NoArgsConstructor;
import me.articket.server.user.domain.User;

@Data
@NoArgsConstructor
public class UserRes {

    private Long userId;

    private String profileUrl;

    private String nickname;

    private String email;

    public static UserRes of(User user) {
        UserRes userRes = new UserRes();
        userRes.userId = user.getId();
        userRes.profileUrl = user.getProfileUrl();
        userRes.nickname = user.getNickname();
        userRes.email = user.getEmail();
        return userRes;
    }

}
