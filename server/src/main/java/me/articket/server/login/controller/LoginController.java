package me.articket.server.login.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.common.jwt.TokenProvider;
import me.articket.server.login.data.KakaoOAuthTokenRes;
import me.articket.server.login.data.KakaoUserInfoRes;
import me.articket.server.login.data.OauthTokenRes;
import me.articket.server.login.repository.RefreshTokenRepository;
import me.articket.server.login.service.LoginService;
import me.articket.server.user.domain.RefreshToken;
import me.articket.server.user.domain.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @GetMapping("/oauth2/code/kakao")
    public OauthTokenRes getAccessTokenJsonData(@RequestParam String code) { // Data를 리턴해주는 컨트롤러 함수

        KakaoOAuthTokenRes oauthTokenData = loginService.getTokenbyCode(code);

        KakaoUserInfoRes userinfo = loginService.getUserInfoByToken(oauthTokenData.getAccess_token());

        User user = new User();
        user = loginService.RegistrationCheck(userinfo);

        OauthTokenRes oauthTokenRes = tokenProvider.generateTokenDto(user);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUserRefreshToken(user, oauthTokenRes.getRefreshToken());
        refreshTokenRepository.save(refreshToken);

        return oauthTokenRes;
    }
}
