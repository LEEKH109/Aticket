package me.articket.server.login.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import me.articket.server.login.data.OAuthToken;
import me.articket.server.login.service.LoginService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/login/oauth2/code/kakao")
    public String getAccessTokenJsonData(@RequestParam String code) throws JsonProcessingException { // Data를 리턴해주는 컨트롤러 함수
        System.out.println(code);
        //return code;
        String OAuthTokenData = loginService.getTokenbyCode(code);
//        return OAuthTokenData;
        ObjectMapper objectMapper = new ObjectMapper();
        OAuthToken oauthToken = objectMapper.readValue(OAuthTokenData, OAuthToken.class);

        String userinfo = loginService.getUserInfoByToken(oauthToken.getAccess_token());

        return loginService.RegistrationCheck(userinfo);

//        KakaoUserInfo kakaoUserInfo = objectMapper.readValue(userinfo, KakaoUserInfo.class);
    }
}
