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

  @Select("SELECT COUNT(*) " +
      "FROM seat " +
      "WHERE timetable_id = #{timetableId} AND seat_number = #{seatNumber}")
  int countValidSeatId(@Param("timetableId") int timetableId, @Param("seatNumber") String seatNumber);
}
