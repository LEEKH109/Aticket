package me.articket.vendor.timetable.repository;

import me.articket.vendor.timetable.data.TimetableDtoRes;
import me.articket.vendor.timetable.domain.Timetable;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TimetableRepository {
    @Select("SELECT * FROM timetable WHERE art_id = #{artId}")
    Timetable selectTimetable(int artId);

    @Select("SELECT date " +
            "FROM timetable " +
            "WHERE art_id = #{artId} " +
            "GROUP BY date " +
            "HAVING SUM(status = 0) > 0")
    List<TimetableDtoRes> findTimetableByArtId(int artId);

    @Select("SELECT * FROM timetable WHERE art_id = #{artId} AND date = #{date}")
    List<Timetable> findTimetableByDate(@Param("artId") int artId, @Param("date") String date);
}
