package me.articket.vendor.seat.repository;

import java.util.List;
import me.articket.vendor.seat.data.SeatReservationInfoDto;
import me.articket.vendor.seat.data.SeatTotalDtoRes;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface SeatRepository {
  // 전시 공연 유효성 체크
  @Select("SELECT COUNT(*) " +
      "FROM art " +
      "WHERE art_id = #{artId}")
  int countSeatValidArtId(@Param("artId") int artId);

  // 해당 시간표-좌석 유효성 체크
  @Select("SELECT " +
      "CASE " +
      "WHEN COUNT(*) > 0 THEN 'EXISTS_RESERVED' " +
      "ELSE 'NOT_EXISTS' " +
      "END AS seat_status " +
      "FROM seat " +
      "WHERE timetable_id = #{timetableId} " +
      "AND seat_number = #{seatNumber}")
  String checkSeatValidation(@Param("timetableId") int timetableId, @Param("seatNumber") String seatNumber);

  // 시간표 기준으로 예약가능한 좌석 조회 메서드
  @Select("SELECT timetable_id as timetableId, seat_number as seatNumber, status, type, price " +
      "FROM seat " +
      "WHERE timetable_id = #{timetableId}")
  List<SeatTotalDtoRes.SeatDtoRes> findSeatByTimetableId(int timetableId);

  // 예약 요청 기준으로 DB에서 일괄 조회 메서드
  @Select("<script>" +
      "SELECT a.art_id, a.title AS artTitle, t.timetable_id, t.start_time, t.end_time, s.seat_number, s.status, s.price " +
      "FROM art a " +
      "JOIN timetable t ON a.art_id = t.art_id " +
      "JOIN seat s ON t.timetable_id = s.timetable_id " +
      "WHERE a.art_id = #{artId} AND t.timetable_id = #{timetableId} " +
      "AND s.seat_number IN " +
      "<foreach item='item' collection='seatNumbers' open='(' separator=',' close=')'>" +
      "#{item}" +
      "</foreach>" +
      "</script>")
  List<SeatReservationInfoDto.SeatInfo> findSeatReservationInfo(
      @Param("artId") int artId,
      @Param("timetableId") int timetableId,
      @Param("seatNumbers") List<String> seatNumbers);
}
