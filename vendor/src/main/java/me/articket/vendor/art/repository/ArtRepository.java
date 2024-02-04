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

  // 해당 객체가 전시,연극,뮤지컬 중 어디에 속하는지 확인
  @Select("SELECT c.name " +
      "FROM art a JOIN category c ON a.category_id = c.category_id " +
      "WHERE a.art_id = #{artId}")
  String findCategoryNameByArtId(@Param("artId") int artId);
}
