package me.articket.server.like.repository;

import me.articket.server.like.domain.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findTopByShorts_IdAndUser_IdOrderByCreatedDateDesc(Long shorts_id, Long user_id);
}
