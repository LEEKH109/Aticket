package me.articket.vendor.art.repository;

import me.articket.vendor.art.domain.Art;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ArtRepository {

  @Select("SELECT * " +
      "FROM art " +
      "WHERE art_id = #{artId}")
  Art selectArt(@Param("artId") int artId);
}
