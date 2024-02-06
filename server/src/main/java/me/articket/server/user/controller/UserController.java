package me.articket.server.user.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import me.articket.server.common.response.SuccessResponse;
import me.articket.server.user.data.ProfileUrlRes;
import me.articket.server.user.data.UserRes;
import me.articket.server.user.domain.User;
import me.articket.server.user.repository.UserRepository;
import me.articket.server.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.base-url}")
    private String baseUrl;

    private final UserService userService;

    @GetMapping("/{id}")
    public SuccessResponse<UserRes> getUser(@PathVariable Long id) {
        return new SuccessResponse<>(userService.getUser(id));
    }

    @PostMapping("/{id}/profile")
    public SuccessResponse<ProfileUrlRes> uploadProfileImage(@PathVariable Long id, @RequestPart MultipartFile file) {
        System.out.println(file.getOriginalFilename());
        try {
            // auth 비교
            String fileName = file.getOriginalFilename();
            String fileUrl = baseUrl + fileName;
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            PutObjectRequest putObjectRequest = new PutObjectRequest(
                    bucket, fileName, file.getInputStream(), metadata
            );
            putObjectRequest.withCannedAcl(CannedAccessControlList.PublicRead);
            amazonS3Client.putObject(putObjectRequest);

            Optional<User> optionalUser = userRepository.findById(id);

            User user = optionalUser.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND_ERROR));
            user.setProfileUrl(fileUrl);

            userRepository.save(user);

            return new SuccessResponse<>(new ProfileUrlRes(id, fileUrl));
        } catch (IOException e) {
            throw new RuntimeException();
        }
    }

    @DeleteMapping("/{id}/profile")
    public SuccessResponse<ProfileUrlRes> defaultProfileImage(@PathVariable Long id) {
        Optional<User> optionalUser = userRepository.findById(id);

        optionalUser.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND_ERROR));
        User user = optionalUser.get();
        user.setProfileUrl("https://articketbuket.s3.ap-northeast-2.amazonaws.com/defaultProfile.jpg");

        userRepository.save(user);

        return new SuccessResponse<>(new ProfileUrlRes(id, "https://articketbuket.s3.ap-northeast-2.amazonaws.com/defaultProfile.jpg"));
    }

    @PostMapping("/{id}/nickname")
    public SuccessResponse<UserRes> updateNickname(@PathVariable Long id, @RequestBody String nickname) {

        Optional<User> optionalUser = userRepository.findById(id);

        optionalUser.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND_ERROR));
        User user = optionalUser.get();
        user.setNickname(nickname);

        userRepository.save(user);

        return new SuccessResponse<>(new UserRes(id, nickname));
    }

}
