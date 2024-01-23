package me.articket.server.user.service;

import lombok.RequiredArgsConstructor;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import me.articket.server.user.data.UserRes;
import me.articket.server.user.domain.User;
import me.articket.server.user.repository.UserRepository;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final String GRANT_TYPE = "authorization_code";
    private final String CLIENT_ID = "ec017b3c3544785a04f17e5ecdd5ae0f";
    private final String REDIRECT_URI = "http://localhost:8080/login/oauth2/code/kakao";
    private final String CLIENT_SECRET = "79ObYX7OHUar61GFiJaLzpNT9JeihXoY";
    private final String TOKEN_URL = "https://kauth.kakao.com/oauth/token";


    // UserRepository 인스턴스를 주입받기 위한 생성자s
    private final UserRepository userRepository;

    // 사용자 정보를 조회하는 메서드
    public UserRes getUser(Long id) {
        // 주어진 ID로 사용자를 찾음
        Optional<User> optionalUser = userRepository.findById(id);

        // 사용자가 존재하지 않으면 CustomException을 던짐 (ErrorCode.USER_NOT_FOUND_ERROR)
        optionalUser.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND_ERROR));

        // Optional에서 사용자 객체를 가져옴
        User user = optionalUser.get();

        // UserRes 클래스의 정적 팩토리 메서드를 사용하여 UserRes 객체를 생성하여 반환
        return UserRes.of(user);
    }

    public String getTokenbyCode(String code) {

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
                "https://kauth.kakao.com/oauth/token", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                kakaoTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );
        return response.getBody();
    }

    public String getUserInfoByToken(String token) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer "+token);
        headers.add("Content-Type","application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> req = new HttpEntity<>(headers);

        ResponseEntity<String> res = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                req,
                String.class
        );

        return res.getBody();
    }
}