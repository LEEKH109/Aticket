package me.articket.server.user.data;

import lombok.Data;

@Data
public class OAuthToken { //OAuth 데이터를 담을 Object
    private String access_token;
    private String token_type;
    private String refresh_token;
    private int expires_in;
    private String scope;
    private int refresh_token_expires_in;
}
