package me.articket.server.login.service;

import com.nimbusds.jose.shaded.gson.Gson;
import lombok.RequiredArgsConstructor;
import me.articket.server.common.jwt.TokenProvider;
import me.articket.server.login.data.KakaoOAuthTokenRes;
import me.articket.server.login.data.KakaoUserInfoRes;
import me.articket.server.login.data.OauthTokenRes;
import me.articket.server.login.data.UserDetail;
import me.articket.server.login.repository.RefreshTokenRepository;
import me.articket.server.user.domain.RefreshToken;
import me.articket.server.user.domain.User;
import me.articket.server.user.repository.UserRepository;
import org.antlr.v4.runtime.Token;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    private final String GRANT_TYPE = "authorization_code";

    @Value("${spring.security.oauth2.provider.kakao.client-id}")
    private String CLIENT_ID;

    private final String REDIRECT_URI = "http://i10a704.p.ssafy.io/login/oauth2/code/kakao";

    @Value("${spring.security.oauth2.provider.kakao.client-secret}")
    private String CLIENT_SECRET;

    private final String TOKEN_URL = "https://kauth.kakao.com/oauth/token";

    @Value("${default-profile-url}")
    private String defaultUrl;

    public KakaoOAuthTokenRes getTokenbyCode(String code) {

        // POST 방식으로 key=value 데이터를 요청 (카카오쪽으로)
        // 이 때 필요한 라이브러리가 RestTemplate, 얘를 쓰면 http 요청을 편하게 할 수 있다.
        RestTemplate rt = new RestTemplate();

        // HTTP POST를 요청할 때 보내는 데이터(body)를 설명해주는 헤더도 만들어 같이 보내줘야 한다.
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        // body 데이터를 담을 오브젝트인 MultiValueMap를 만들어보자
        // body는 보통 key, value의 쌍으로 이루어지기 때문에 자바에서 제공해주는 MultiValueMap 타입을 사용한다.
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", GRANT_TYPE);
        params.add("client_id", CLIENT_ID);
        params.add("redirect_uri", REDIRECT_URI);
        params.add("code", code);

        // 요청하기 위해 헤더(Header)와 데이터(Body)를 합친다.
        // kakaoTokenRequest는 데이터(Body)와 헤더(Header)를 Entity가 된다.
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // POST 방식으로 Http 요청한다. 그리고 response 변수의 응답 받는다.
        ResponseEntity<String> response = rt.exchange(
                TOKEN_URL, // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                kakaoTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );

        Gson gson = new Gson();

        return gson.fromJson(response.getBody(), KakaoOAuthTokenRes.class);

    }

    public KakaoUserInfoRes getUserInfoByToken(String token) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> req = new HttpEntity<>(headers);

        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                req,
                String.class
        );

        Gson gson = new Gson();

        return gson.fromJson(response.getBody(), KakaoUserInfoRes.class);

    }

    public User registrationCheck(KakaoUserInfoRes userinfo) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate birthday = LocalDate.parse(userinfo.getKakao_account().getBirthyear() + userinfo.getKakao_account().getBirthday(), formatter);

        if (userRepository.findByKakaoId(userinfo.getId()) == null) {
            User newuser = new User();
            newuser.setKakaoUserInfo(
                    userinfo.getId(),
                    userinfo.getKakao_account().getName(),
                    userinfo.getKakao_account().getEmail(),
                    birthday,
                    userinfo.getKakao_account().getProfile().getNickname(),
                    defaultUrl);
            userRepository.save(newuser);
        }

        return userRepository.findByKakaoId(userinfo.getId());
    }

    public User getUserInfoByRefreshToken(String refreshtoken) {

        UserDetail userDetail = tokenProvider.getUserDetailbyRefreshToken(refreshtoken);

        return userRepository.findById(userDetail.getId())
                .orElseThrow();

    }

    public OauthTokenRes replaceToken(User user, RefreshToken refreshToken) {

        OauthTokenRes oauthTokenRes = tokenProvider.generateTokenDto(user);
        refreshToken.setExpired();
        refreshTokenRepository.save(refreshToken);
        RefreshToken newrefreshToken = new RefreshToken();
        newrefreshToken.setUserRefreshToken(user, oauthTokenRes.getRefreshToken(), oauthTokenRes.getRefreshTokenExpiresIn() / 1000);
        refreshTokenRepository.save(newrefreshToken);

        return oauthTokenRes;
    }
}
