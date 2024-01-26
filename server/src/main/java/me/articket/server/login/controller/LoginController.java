package me.articket.server.login.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import me.articket.server.login.data.KakaoOAuthTokenRes;
import me.articket.server.login.service.LoginService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/oauth2/code/kakao")
    public String getAccessTokenJsonData(@RequestParam String code) throws JsonProcessingException { // Data를 리턴해주는 컨트롤러 함수

        String OAuthTokenData = loginService.getTokenbyCode(code);
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoOAuthTokenRes oauthToken = objectMapper.readValue(OAuthTokenData, KakaoOAuthTokenRes.class);

        String userinfo = loginService.getUserInfoByToken(oauthToken.getAccess_token());

        return loginService.RegistrationCheck(userinfo);

    }
}
