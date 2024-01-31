package me.articket.server.login.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import me.articket.server.common.jwt.TokenProvider;
import me.articket.server.common.response.SuccessResponse;
import me.articket.server.login.data.*;
import me.articket.server.login.repository.RefreshTokenRepository;
import me.articket.server.login.service.LoginService;
import me.articket.server.user.domain.RefreshToken;
import me.articket.server.user.domain.User;
import me.articket.server.user.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    @GetMapping("/oauth2/code/kakao")
    public SuccessResponse<OauthTokenRes> getAccessTokenJsonData(@RequestParam String code) { // Data를 리턴해주는 컨트롤러 함수

        KakaoOAuthTokenRes oauthTokenData = loginService.getTokenbyCode(code);

        KakaoUserInfoRes userinfo = loginService.getUserInfoByToken(oauthTokenData.getAccess_token());

        User user = loginService.RegistrationCheck(userinfo);

        OauthTokenRes oauthTokenRes = tokenProvider.generateTokenDto(user);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUserRefreshToken(user, oauthTokenRes.getRefreshToken());
        System.out.println(refreshToken.getToken());
        refreshTokenRepository.save(refreshToken);
        return new SuccessResponse<>(oauthTokenRes);
    }

    @PostMapping("/oauth/token")
    public SuccessResponse<OauthTokenRes> regenerateToken(@RequestBody RefreshTokenReq refreshTokenReq) {

        //Access Token 정보 가져오기
        Authentication authentication = tokenProvider.getAuthentication(refreshTokenReq.getRefreshToken());

        //Refresh Token 일치 여부
        RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenReq.getRefreshToken())
                .orElseThrow(() -> new CustomException(ErrorCode.REFRESH_TOKEN_VALIDATION_ERROR));

        //Refresh Token 만료 여부
        if (!refreshToken.isValid(LocalDateTime.now())) {
            throw new CustomException(ErrorCode.REFRESH_TOKEN_VALIDATION_ERROR);
        }


        //유저 정보 가져오기
        UserDetail userDetail = (UserDetail) authentication.getDetails();
        User user = userRepository.findById(userDetail.getId())
                .orElseThrow(); //이론상 불가능한 경우임


        // 유저 정보를 이용해서 새로운 토큰 생성
        OauthTokenRes oauthTokenRes = tokenProvider.generateTokenDto(user);


        refreshToken.setExpired();
        refreshTokenRepository.save(refreshToken);
        RefreshToken newrefreshToken = new RefreshToken();
        newrefreshToken.setUserRefreshToken(user, oauthTokenRes.getRefreshToken());
        refreshTokenRepository.save(newrefreshToken);
        return new SuccessResponse<>(oauthTokenRes);
    }

}
