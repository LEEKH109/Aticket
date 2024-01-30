package me.articket.vendor.tickettype.repository;

import me.articket.vendor.tickettype.data.TicketTotalDtoRes;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
@Repository
public interface TicketTyperRepository {
    @Select("SELECT ticket_type_id, user_type, price " +
            "FROM ticket_type " +
            "WHERE timetable_id = #{timetableId}")
    List<TicketTotalDtoRes.TicketTypeDtoRes> findTicketTypesByTimetableId(int timetableId);
}
