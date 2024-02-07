package me.articket.server.shorts.service;

import lombok.RequiredArgsConstructor;
import me.articket.server.art.data.ArtCategory;
import me.articket.server.art.domain.Art;
import me.articket.server.art.repository.ArtRepository;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import me.articket.server.shorts.data.*;
import me.articket.server.shorts.domain.Shorts;
import me.articket.server.shorts.repository.ShortsRepository;
import me.articket.server.user.domain.User;
import me.articket.server.user.repository.UserRepository;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShortsService {

    private final ShortsRepository shortsRepository;

    private final ArtRepository artRepository;

    private final UserRepository userRepository;

    public ShortsInfoRes getShortsInfo(Long id) {
        Optional<Shorts> optionalShorts = shortsRepository.findById(id);
        Shorts shorts = optionalShorts.orElseThrow(() -> new CustomException(ErrorCode.SHORTS_NOT_FOUND_ERROR));
        return ShortsInfoRes.of(shorts);
    }

    public ShortsInfoRes addShorts(AddShortsReq req) {
        Optional<Art> optionalArt = artRepository.findById(req.getArtId());
        Art art = optionalArt.orElseThrow(() -> new CustomException(ErrorCode.ART_NOT_FOUND_ERROR));
        Shorts shorts = req.apply(new Shorts(), art);
        shorts = shortsRepository.save(shorts);
        return ShortsInfoRes.of(shorts);
    }

    public ShortsInfoRes modifyShortsInfo(Long id, ModifyShortsReq req) {
        Optional<Shorts> optionalShorts = shortsRepository.findById(id);
        Shorts shorts = optionalShorts.orElseThrow(() -> new CustomException(ErrorCode.SHORTS_NOT_FOUND_ERROR));
        req.apply(shorts);
        shorts = shortsRepository.save(shorts);
        return ShortsInfoRes.of(shorts);
    }

    public List<LikedShortsInfoRes> getLikedShorts(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND_ERROR));
        List<Shorts> shorts = shortsRepository.findByUserAndLikeStateIsTrue(user);
        return shorts.stream().map(LikedShortsInfoRes::of).toList();
    }

    public List<RecommendedShortsInfoRes> recommendShorts(Long userId, @Nullable ArtCategory category) {
        Optional<User> optionalUser = userRepository.findById(userId);
//        User user = optionalUser.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND_ERROR));
        List<Shorts> shorts = category == null ? shortsRepository.findAll() : shortsRepository.findAllByArt_Category(category);
        return shorts.stream().map(RecommendedShortsInfoRes::of).toList();
    }
}
