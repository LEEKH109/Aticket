package me.articket.vendor.seat.repository;

import java.util.List;
import me.articket.vendor.seat.data.SeatTotalDtoRes;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface SeatRepository {

  @Select("SELECT timetable_id as timetableId, seat_number as seatNumber, status, type, price " +
      "FROM seat " +
      "WHERE timetable_id = #{timetableId}")
  List<SeatTotalDtoRes.SeatDtoRes> findSeatByTimetableId(int timetableId);
}
