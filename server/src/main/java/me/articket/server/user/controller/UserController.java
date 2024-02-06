package me.articket.server.user.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.common.response.SuccessResponse;
import me.articket.server.user.data.NicknameReq;
import me.articket.server.user.data.ProfileUrlRes;
import me.articket.server.user.data.UserRes;
import me.articket.server.user.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public SuccessResponse<UserRes> getUser(@PathVariable Long id) {
        return new SuccessResponse<>(userService.getUser(id));
    }

    @PutMapping("/{id}/profile")
    public SuccessResponse<ProfileUrlRes> setProfileImage(@PathVariable Long id, @RequestPart MultipartFile file) {
        return new SuccessResponse<>(userService.uploadProfile(id, file));
    }

    @DeleteMapping("/{id}/profile")
    public SuccessResponse<ProfileUrlRes> defaultProfileImage(@PathVariable Long id) {
        return new SuccessResponse<>(userService.setProfileUrl(id, "https://articketbuket.s3.ap-northeast-2.amazonaws.com/defaultProfile.jpg"));
    }

    @PutMapping("/{id}/nickname")
    public SuccessResponse<UserRes> updateNickname(@PathVariable Long id, @RequestBody NicknameReq nickname) {
        return new SuccessResponse<>(userService.setNickname(id, nickname.getNickname()));
    }

}
