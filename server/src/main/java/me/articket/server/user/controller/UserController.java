package me.articket.server.user.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.common.response.SuccessResponse;
import me.articket.server.login.data.UserDetail;
import me.articket.server.user.data.UserRes;
import me.articket.server.user.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {


    private final UserService userService;

    @GetMapping("/{id}")
    public SuccessResponse<UserRes> getUser(@PathVariable Long id) {
        return new SuccessResponse<>(userService.getUser(id));
    }

    @GetMapping("/test")
    public String test(@AuthenticationPrincipal UserDetail details) {
        return "니 닉네임은 '" + details.getNickname() + "' 입니다.";
    }
}
