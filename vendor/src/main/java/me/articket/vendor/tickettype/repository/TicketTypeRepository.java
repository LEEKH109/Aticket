package me.articket.vendor.tickettype.repository;

import java.util.List;
import me.articket.vendor.tickettype.data.TicketTotalDtoRes;
import me.articket.vendor.tickettype.domin.TicketType;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface TicketTypeRepository {
  // 전시 공연 유효성 체크
  @Select("SELECT COUNT(*) " +
      "FROM art " +
      "WHERE art_id = #{artId}")
  int countSeatByArtId(@Param("artId") int artId);
  // timetable 유효성 체크
  @Select("SELECT COUNT(*) " +
      "FROM timetable " +
      "WHERE timetable_id = #{timetableId}")
  int countTimetableId(@Param("timetableId") int timetableId);
  // ticketType 유효성 체크
  @Select("SELECT COUNT(*) " +
      "FROM ticket_type " +
      "WHERE ticket_type_id = #{ticketTypeId}")
  int countTicketTypeId(@Param("ticketTypeId") int ticketTypeId);
  // ticketType 조회
  @Select("SELECT ticket_type_id, user_type, price " +
      "FROM ticket_type " +
      "WHERE timetable_id = #{timetableId}")
  List<TicketTotalDtoRes.TicketTypeDtoRes> findTicketTypesByTimetableId(int timetableId);
  // ticketTypeId 리스트 기반 조회
  @Select("<script> " +
          "SELECT * " +
          "FROM ticket_type " +
          "WHERE ticket_type_id IN "+
          "<foreach item='id' collection='ids' open='(' separator=',' close=')'>" +
          "#{id}" +
          "</foreach>" +
          "</script>")
  List<TicketType> findAllByIds(@Param("ids") List<Integer> ids);
}
