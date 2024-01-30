package me.articket.vendor.tickettype.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.*;
import me.articket.vendor.tickettype.data.TicketTypeDtoRes;

import java.util.List;

@Mapper
@Repository
public interface TicketTyperRepository {
    @Select("SELECT tickettype_id as ticketId, user_type as name, price " +
            "FROM tickettype " +
            "WHERE timetable_id = #{timetableId}")
    List<TicketTypeDtoRes> findTicketTypesByTimetableId(int timetableId);
}
