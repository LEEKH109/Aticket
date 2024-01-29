package me.articket.server.like.service;

import lombok.RequiredArgsConstructor;
import me.articket.server.like.data.LikeStateRes;
import me.articket.server.like.domain.Like;
import me.articket.server.like.repository.LikeRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;

    public LikeStateRes getLikeState(Long shorts_id, Long user_id) {
        Optional<Like> optionalLike = likeRepository.findTopByShorts_IdAndUser_IdOrderByCreatedDateDesc(shorts_id, user_id);
        boolean like = optionalLike.map(Like::getLike).orElse(false);
        return LikeStateRes.of(like);
    }
}
