package me.articket.vendor.art.sevice;

import lombok.RequiredArgsConstructor;
import me.articket.vendor.art.domain.Art;
import me.articket.vendor.art.repository.ArtRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArtService {
    private final ArtRepository artRepository;
    public boolean createArt(Art art){
        return artRepository.insertArt(art) > 0;
    }
    public boolean updateArt(Art art){
        return artRepository.updateArt(art) > 0;
    }
    public boolean deleteArt(int artId){
        return artRepository.deleteArt(artId) > 0;
    }
    public Art selectArt(int artId){
        return artRepository.selectArt(artId);
    }

}
