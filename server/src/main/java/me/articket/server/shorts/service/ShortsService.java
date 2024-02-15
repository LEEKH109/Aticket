package me.articket.server.shorts.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import me.articket.server.art.data.ArtCategory;
import me.articket.server.art.domain.Art;
import me.articket.server.art.repository.ArtRepository;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import me.articket.server.shorts.data.*;
import me.articket.server.shorts.domain.Shorts;
import me.articket.server.shorts.domain.Viewlog;
import me.articket.server.shorts.repository.ShortsRepository;
import me.articket.server.shorts.repository.ViewlogRepository;
import me.articket.server.user.domain.User;
import me.articket.server.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ShortsService {

    @Value("${recommend-server-url}")
    private String recommendServerUrl;

    @Value("${recommend-shorts-path}")
    private String recommendShortsPath;

    private final ShortsRepository shortsRepository;

    private final ArtRepository artRepository;

    private final UserRepository userRepository;

    private final ViewlogRepository viewlogRepository;

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
        RestClient restClient = RestClient.create(recommendServerUrl);
        List<Long> ids = restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(recommendShortsPath)
                        .queryParam("user_id", userId)
                        .queryParamIfPresent("category", Optional.ofNullable(category))
                        .build())
                .retrieve()
                .body(new ParameterizedTypeReference<List<Long>>() {
                });
        List<Shorts> shorts = shortsRepository.findAllById(ids);
        // 원래 순서대로 정렬
        Map<Long, Integer> idToIndex = new HashMap<>();
        for (int i = 0; i < ids.size(); i++) {
            idToIndex.put(ids.get(i), i);
        }
        shorts.sort(Comparator.comparingInt(sh -> idToIndex.get(sh.getId())));
        return shorts.stream().map(RecommendedShortsInfoRes::of).toList();
    }

    @Transactional
    public ViewlogRes addViewLog(Long shortsId, Long userId, AddViewlogReq req) {
        Optional<Shorts> optionalShorts = shortsRepository.findById(shortsId);
        Shorts shorts = optionalShorts.orElseThrow(() -> new CustomException(ErrorCode.SHORTS_NOT_FOUND_ERROR));
        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND_ERROR));
        Viewlog viewlog = Viewlog.builder()
                .shorts(shorts)
                .user(user)
                .viewDetail(req.getViewDetail())
                .viewTime(req.getViewTime())
                .build();
        viewlog = viewlogRepository.save(viewlog);
        return ViewlogRes.of(viewlog);
    }
}
