package me.articket.vendor.timetable.repository;

import java.util.List;
import me.articket.vendor.timetable.data.TimetableDetailDtoRes;
import me.articket.vendor.timetable.data.TimetableDtoRes;
import me.articket.vendor.timetable.domain.Timetable;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface TimetableRepository {

  @Select("SELECT * " +
  "FROM timetable " +
  "WHERE timetable_id = #{timetableId}")
  Timetable findTimetableByTimetableId(int timetableId);
  @Select("SELECT date " +
      "FROM timetable " +
      "WHERE art_id = #{artId} " +
      "GROUP BY date " +
      "HAVING SUM(status = 1) > 0")
  List<TimetableDtoRes> findTimetableByArtId(int artId);

  @Select("SELECT t.art_id, c.name as category, t.date " +
      "FROM timetable t " +
      "JOIN art a ON t.art_id = a.art_id " +
      "JOIN category c ON a.category_id = c.category_id " +
      "WHERE t.timetable_id = #{timetableId}")
  TimetableDetailDtoRes findTimetableDetailsByTimetableId(int timetableId);

  @Select("SELECT * FROM timetable WHERE art_id = #{artId} AND date = #{date}")
  List<Timetable> findTimetableByDate(@Param("artId") int artId, @Param("date") String date);
}
