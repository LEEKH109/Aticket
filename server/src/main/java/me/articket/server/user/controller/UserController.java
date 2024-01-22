package me.articket.server.user.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.common.response.SuccessResponse;
import me.articket.server.user.data.UserRes;
import me.articket.server.user.service.UserService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;


@RestController
@RequiredArgsConstructor
public class UserController {

    private final String GRANT_TYPE = "authorization_code";
    private final String CLIENT_ID = "ec017b3c3544785a04f17e5ecdd5ae0f";
    private final String REDIRECT_URI = "http://localhost:8080/login/oauth2/code/kakao";
    private final String CLIENT_SECRET = "79ObYX7OHUar61GFiJaLzpNT9JeihXoY";
    private final String TOKEN_URL = "https://kauth.kakao.com/oauth/token";


    private final UserService userService;


    @GetMapping
    @RequestMapping("/user/{id}")
    public SuccessResponse<UserRes> getUser(@PathVariable Long id) {
        return new SuccessResponse<>(userService.getUser(id));
    }

    @GetMapping("/login/oauth2/code/kakao")
    public String getAccessTokenJsonData(String code) { // Data를 리턴해주는 컨트롤러 함수
        //return code;
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity request = new HttpEntity(headers);

        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(TOKEN_URL)
                .queryParam("grant_type", GRANT_TYPE)
                .queryParam("client_id", CLIENT_ID)
                .queryParam("redirect_uri", REDIRECT_URI)
                .queryParam("code", code)
                .queryParam("client_secret", CLIENT_SECRET);
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                uriComponentsBuilder.toUriString(),
                HttpMethod.POST,
                request,
                String.class
        );
        return responseEntity.getBody();
    }
}
