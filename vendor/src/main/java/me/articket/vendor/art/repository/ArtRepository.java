package me.articket.vendor.art.repository;

import me.articket.vendor.art.domain.Art;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ArtRepository {
    int insertArt(Art art);
    int updateArt(Art art);
    int deleteArt(int artId);
    Art selectArt(int artId);
}
