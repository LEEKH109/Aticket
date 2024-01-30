package me.articket.vendor.seat.repository;

import me.articket.vendor.seat.data.SeatDtoRes;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface SeatRepository {
    @Select("SELECT timetable_id as timetableId, seat_number as seatNumber, status, type, price " +
            "FROM seat "+
            "WHERE timetable_id = #{timetableId}")
    List<SeatDtoRes> findSeatByTimetableId(int timetableId);
}
