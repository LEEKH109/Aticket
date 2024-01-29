package me.articket.server.shorts.service;

import lombok.RequiredArgsConstructor;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import me.articket.server.shorts.data.ShortsInfoRes;
import me.articket.server.shorts.domain.Shorts;
import me.articket.server.shorts.repository.ShortsRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShortsService {

    private final ShortsRepository shortsRepository;

    public ShortsInfoRes getShortsInfo(Long id) {
        Optional<Shorts> optionalShorts = shortsRepository.findById(id);
        optionalShorts.orElseThrow(() -> new CustomException(ErrorCode.SHORTS_NOT_FOUND_ERROR));
        Shorts shorts = optionalShorts.get();
        return ShortsInfoRes.of(shorts);
    }
}
