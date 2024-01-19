package me.articket.server.user.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.common.response.SuccessResponse;
import me.articket.server.user.data.UserRes;
import me.articket.server.user.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping
    @RequestMapping("/{id}")
    public SuccessResponse<UserRes> getUser(@PathVariable Long id) {
        return new SuccessResponse<>(userService.getUser(id));
    }
}
