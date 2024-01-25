package me.articket.server.user.service;

import com.nimbusds.jose.shaded.gson.JsonElement;
import com.nimbusds.jose.shaded.gson.JsonObject;
import com.nimbusds.jose.shaded.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import me.articket.server.user.domain.User;
import me.articket.server.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;

    private final String GRANT_TYPE = "authorization_code";

    @Value("${spring.datasource.client-id}")
    private String CLIENT_ID;

    private final String REDIRECT_URI = "http://localhost:8080/login/oauth2/code/kakao";

    @Value("${spring.datasource.client-secret}")
    private String CLIENT_SECRET;

    private final String TOKEN_URL = "https://kauth.kakao.com/oauth/token";

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
                TOKEN_URL, // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                kakaoTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );
        return response.getBody();
    }

    public String getUserInfoByToken(String token) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> req = new HttpEntity<>(headers);

        ResponseEntity<String> res = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                req,
                String.class
        );

        return res.getBody();
    }

    public String RegistrationCheck(String userinfo) {

        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(userinfo);

        JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
        JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();

        String loginuserkakaoId = element.getAsJsonObject().get("id").getAsString();

        String nickname = properties.getAsJsonObject().get("nickname").getAsString();
        String birthyearday = kakao_account.getAsJsonObject().get("birthyear").getAsString() + kakao_account.getAsJsonObject().get("birthday").getAsString();
        String profile_image = properties.getAsJsonObject().get("profile_image").getAsString();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate birthday = LocalDate.parse(birthyearday, formatter);

        if (userRepository.findUserByKakaoId(loginuserkakaoId).isEmpty()) {

            String name = kakao_account.getAsJsonObject().get("name").getAsString();
            String email = kakao_account.getAsJsonObject().get("email").getAsString();
            User newuser = new User();
            newuser.setKakaoUserInfo(loginuserkakaoId, name, email, birthday, nickname, profile_image);
            userRepository.save(newuser);
        }



        JsonObject json = new JsonObject();
        json.addProperty("nickname", nickname);
        json.addProperty("birthday", String.valueOf(birthday));
        json.addProperty("profile_image", profile_image);

        return json.toString();

    }
}
