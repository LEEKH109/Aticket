package me.articket.server.user.service;

import lombok.RequiredArgsConstructor;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import me.articket.server.user.data.UserRes;
import me.articket.server.user.domain.User;
import me.articket.server.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {


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
}