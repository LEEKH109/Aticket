package me.articket.server.login.data;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RequestTokenRes {
    private String accessToken;
    private String refreshToken;
}
