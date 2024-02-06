package me.articket.server.user.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import me.articket.server.user.data.NicknameRes;
import me.articket.server.user.data.ProfileUrlRes;
import me.articket.server.user.data.UserRes;
import me.articket.server.user.domain.User;
import me.articket.server.user.repository.UserRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    // UserRepository 인스턴스를 주입받기 위한 생성자s
    private final UserRepository userRepository;

    @Autowired
    AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.base-url}")
    private String baseUrl;

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

    public NicknameRes setNickname(Long id, String nickname) {

        Optional<User> optionalUser = userRepository.findById(id);

        User user = optionalUser.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND_ERROR));

        if (!user.setNickname(nickname)) {
            throw new CustomException(ErrorCode.USER_NICKNAME_WRONG_ERROR);
        }

        user = userRepository.save(user);

        return new NicknameRes(id, nickname);
    }

    public ProfileUrlRes uploadProfile(Long id, MultipartFile file) {

        try {
            String fileName = RandomStringUtils.randomAlphanumeric(20);
            String fileUrl = baseUrl + fileName;
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            PutObjectRequest putObjectRequest = new PutObjectRequest(
                    bucket, fileName, file.getInputStream(), metadata
            );
            putObjectRequest.withCannedAcl(CannedAccessControlList.PublicRead);
            amazonS3Client.putObject(putObjectRequest);

            return setProfileUrl(id, fileUrl);
        } catch (IOException e) {
            throw new CustomException(ErrorCode.FILE_UPLOAD_ERROR);
        }
    }

    public ProfileUrlRes setProfileUrl(Long id, String url) {

        Optional<User> optionalUser = userRepository.findById(id);

        User user = optionalUser.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND_ERROR));

        user.setProfileUrl(url);

        user = userRepository.save(user);

        return new ProfileUrlRes(id, url);
    }
}