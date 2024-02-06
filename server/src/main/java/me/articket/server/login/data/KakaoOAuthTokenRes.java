package me.articket.server.login.data;

import lombok.Data;

@Data
public class KakaoOAuthTokenRes { //OAuth 데이터를 담을 Object

    private String token_type;

    private String access_token;

    private Integer expires_in;

    private String refresh_token;

    private Integer refresh_token_expires_in;

}
