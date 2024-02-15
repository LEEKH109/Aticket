package me.articket.server.user.repository;

import me.articket.server.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByKakaoId(Long kakaoId);



}
