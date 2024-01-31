package me.articket.server.like.repository;

import me.articket.server.like.domain.Like;
import me.articket.server.shorts.domain.Shorts;
import me.articket.server.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findTopByShortsAndUserOrderByCreatedDateDesc(Shorts shorts, User user);
}
