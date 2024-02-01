package me.articket.vendor.billing.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface BillingRepository {

  @Select("SELECT COUNT(*) " +
      "FROM art " +
      "WHERE art_id = #{artId} AND category_id = (SELECT category_id FROM category WHERE name = '전시')")
  int countValidArtId(@Param("artId") int artId);

  @Select("SELECT COUNT(*) " +
      "FROM timetable " +
      "WHERE timetable_id = #{timetableId}")
  int countValidTimetableId(@Param("timetableId") int timetableId);

  @Select("SELECT COUNT(*) " +
      "FROM ticket_type " +
      "WHERE ticket_type_id = #{ticketTypeId}")
  int countValidTicketTypeId(@Param("ticketTypeId") int ticketTypeId);

  //해당 좌석이 존재하고 예약이 가능한지 반환
  @Select("SELECT " +
      "CASE " +
      "WHEN COUNT(*) > 0 THEN 'EXISTS_RESERVED' " +
      "ELSE 'NOT_EXISTS' " +
      "END AS seat_status " +
      "FROM seat " +
      "WHERE timetable_id = #{timetableId} " +
      "AND seat_number = #{seatNumber}")
  String checkSeatStatus(@Param("timetableId") int timetableId, @Param("seatNumber") String seatNumber);
}
