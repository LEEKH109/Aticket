package me.articket.server.art.service;

import lombok.RequiredArgsConstructor;
import me.articket.server.art.data.AddArtReq;
import me.articket.server.art.data.ArtInfoRes;
import me.articket.server.art.data.ModifyArtReq;
import me.articket.server.art.domain.Art;
import me.articket.server.art.repository.ArtRepository;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArtService {

    private final ArtRepository artRepository;

    @Transactional(readOnly = true)
    public ArtInfoRes getArtInfo(Long id) {
        Optional<Art> optionalArt = artRepository.findById(id);
        Art art = optionalArt.orElseThrow(() -> new CustomException(ErrorCode.ART_NOT_FOUND_ERROR));
        return ArtInfoRes.of(art);
    }

    @Transactional
    public ArtInfoRes addArt(AddArtReq req) {
        Art art = req.apply(new Art());
        art = artRepository.save(art);
        return ArtInfoRes.of(art);
    }

    @Transactional
    public ArtInfoRes modifyArt(Long id, ModifyArtReq req) {
        Optional<Art> optionalArt = artRepository.findById(id);
        Art art = optionalArt.orElseThrow(() -> new CustomException(ErrorCode.ART_NOT_FOUND_ERROR));
        art = req.apply(art);
        art = artRepository.save(art);
        return ArtInfoRes.of(art);
    }
}
