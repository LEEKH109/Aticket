package me.articket.server.user.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import me.articket.server.common.response.SuccessResponse;
import me.articket.server.user.data.OAuthToken;
import me.articket.server.user.data.UserRes;
import me.articket.server.user.service.UserService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;


@RestController
@RequiredArgsConstructor
public class UserController {




    private final UserService userService;


    @GetMapping
    @RequestMapping("/user/{id}")
    public SuccessResponse<UserRes> getUser(@PathVariable Long id) {
        return new SuccessResponse<>(userService.getUser(id));
    }

    @GetMapping("/login/oauth2/code/kakao")
    public String getAccessTokenJsonData(@RequestParam String code) throws JsonProcessingException { // Data를 리턴해주는 컨트롤러 함수
        //return code;
        String OAuthTokenData = userService.getTokenbyCode(code);
//        return OAuthTokenData;
        ObjectMapper objectMapper = new ObjectMapper();
        OAuthToken oauthToken = objectMapper.readValue(OAuthTokenData, OAuthToken.class);

        String userinfo = userService.getUserInfoByToken(oauthToken.getAccess_token());

        return userinfo;
    }
}
