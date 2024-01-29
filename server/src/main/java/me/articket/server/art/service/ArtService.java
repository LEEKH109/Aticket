package me.articket.server.art.service;

import lombok.RequiredArgsConstructor;
import me.articket.server.art.data.ArtInfoRes;
import me.articket.server.art.domain.Art;
import me.articket.server.art.repository.ArtRepository;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArtService {

    private final ArtRepository artRepository;

    public ArtInfoRes getArtInfo(Long id) {
        Optional<Art> optionalArt = artRepository.findById(id);
        optionalArt.orElseThrow(() -> new CustomException(ErrorCode.ART_NOT_FOUND_ERROR));
        Art art = optionalArt.get();
        return ArtInfoRes.of(art);
    }
}
