package me.articket.server.login.data;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OauthTokenRes {

    private Long userId;

    private String tokenType;

    private String accessToken;

    private Integer expiresIn;

    private String refreshToken;

    private Integer refreshTokenExpiresIn;

}
