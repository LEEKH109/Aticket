package me.articket.server.like.service;

import lombok.RequiredArgsConstructor;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import me.articket.server.like.data.LikeStateRes;
import me.articket.server.like.data.ModifyLikeReq;
import me.articket.server.like.domain.Like;
import me.articket.server.like.repository.LikeRepository;
import me.articket.server.shorts.domain.Shorts;
import me.articket.server.shorts.repository.ShortsRepository;
import me.articket.server.user.domain.User;
import me.articket.server.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;

    private final ShortsRepository shortsRepository;

    private final UserRepository userRepository;

    @Transactional
    public LikeStateRes getLikeState(Long shortsId, Long userId) {
        Optional<Shorts> optionalShorts = shortsRepository.findById(shortsId);
        Shorts shorts = optionalShorts.orElseThrow(() -> new CustomException(ErrorCode.SHORTS_NOT_FOUND_ERROR));
        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND_ERROR)); // 인증 경로이므로 발생하면 안됨
        Optional<Like> optionalLike = likeRepository.findTopByShortsAndUserOrderByCreatedDateDesc(shorts, user);
        boolean state = optionalLike.map(Like::getState).orElse(false);
        return LikeStateRes.of(state);
    }

    @Transactional
    public LikeStateRes setLikeState(Long shortsId, Long userId, ModifyLikeReq req) {
        Optional<Shorts> optionalShorts = shortsRepository.findById(shortsId);
        Shorts shorts = optionalShorts.orElseThrow(() -> new CustomException(ErrorCode.SHORTS_NOT_FOUND_ERROR));
        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND_ERROR)); // 인증 경로이므로 발생하면 안됨
        Optional<Like> optionalLike = likeRepository.findTopByShortsAndUserOrderByCreatedDateDesc(shorts, user);
        boolean state = optionalLike.map(Like::getState).orElse(false);
        if (state == req.getLike()) {
            throw new CustomException(ErrorCode.INVALID_LIKE_REQUEST_ERROR);
        }
        Like like = Like.builder()
                .shorts(shorts)
                .user(user)
                .state(req.getLike())
                .build();
        like = likeRepository.save(like);
        return LikeStateRes.of(like.getState());
    }
}
