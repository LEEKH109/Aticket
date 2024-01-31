package me.articket.server.login.data;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RefreshTokenReq {
    private String refreshToken;
}
