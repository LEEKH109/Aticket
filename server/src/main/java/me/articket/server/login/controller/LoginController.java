package me.articket.server.login.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import me.articket.server.common.jwt.TokenProvider;
import me.articket.server.common.response.SuccessResponse;
import me.articket.server.login.data.KakaoOAuthTokenRes;
import me.articket.server.login.data.KakaoUserInfoRes;
import me.articket.server.login.data.OauthTokenRes;
import me.articket.server.login.data.RefreshTokenReq;
import me.articket.server.login.repository.RefreshTokenRepository;
import me.articket.server.login.service.LoginService;
import me.articket.server.user.domain.RefreshToken;
import me.articket.server.user.domain.User;
import me.articket.server.user.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @GetMapping("/oauth2/code/kakao")
    public SuccessResponse<OauthTokenRes> getAccessTokenJsonData(@RequestParam String code) { // Data를 리턴해주는 컨트롤러 함수

        KakaoOAuthTokenRes oauthTokenData = loginService.getTokenbyCode(code);

        KakaoUserInfoRes kakaoUserInfoRes = loginService.getUserInfoByToken(oauthTokenData.getAccess_token());

        User user = loginService.registrationCheck(kakaoUserInfoRes);

        OauthTokenRes oauthTokenRes = tokenProvider.generateTokenDto(user);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUserRefreshToken(user, oauthTokenRes.getRefreshToken(), oauthTokenRes.getRefreshTokenExpiresIn() / 1000);

        refreshTokenRepository.save(refreshToken);
        return new SuccessResponse<>(oauthTokenRes);
    }

    //토큰 재발급
    @PostMapping("/oauth/token")
    public SuccessResponse<OauthTokenRes> regenerateToken(@RequestBody RefreshTokenReq refreshTokenReq) {

        //Refresh Token 일치 여부
        RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenReq.getRefreshToken())
                .orElseThrow(() -> new CustomException(ErrorCode.REFRESH_TOKEN_VALIDATION_ERROR));

        //Refresh Token 만료 여부
        if (!refreshToken.isValid(LocalDateTime.now())) {
            throw new CustomException(ErrorCode.REFRESH_TOKEN_VALIDATION_ERROR);
        }

        //Refresh Token으로 유저 정보 가져오기
        User user = loginService.getUserInfoByRefreshToken(refreshTokenReq.getRefreshToken());

        // 기존 토큰 권한없애고 새로운 토큰 보내주기
        return new SuccessResponse<>(loginService.replaceToken(user, refreshToken));

    }

}
