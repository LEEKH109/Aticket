package me.articket.vendor.billing.repository;

import java.util.List;
import java.util.Optional;
import me.articket.vendor.billing.data.BookHistoryDto;
import me.articket.vendor.billing.data.ReservationSeatDetailDto;
import me.articket.vendor.billing.data.ReservationTicketDetailDto;
import me.articket.vendor.billing.data.ReservationTicketDetailResponseDto;
import me.articket.vendor.billing.domain.Billing;
import me.articket.vendor.billing.domain.BillingDetail;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface BillingRepository {

  // 결제 객체 생성, tid와 pg_token은 결제 진행 중 생성되는 값이라 null로 둡니다.
  @Insert("INSERT INTO billing (art_id, reservation_id, booker_name, status, category, total_amount) " +
      "VALUES (#{artId}, #{reservationId}, #{bookerName}, #{status}, #{category}, #{totalAmount})")
  @Options(useGeneratedKeys = true, keyProperty = "billingId")
  int insertBilling(Billing billing);

  // 공연을 위한 BillingDetail 생성(삽입)
  @Insert("<script>" +
      "INSERT INTO billing_detail (billing_id, timetable_id, ticket_type_id, seat_timetable_id, seat_number, count) VALUES " +
      "<foreach collection='billingDetails' item='detail' index='index' separator=','>" +
      "(#{detail.billingId}, #{detail.timetableId}, #{detail.ticketTypeId}, #{detail.seatTimetableId}, #{detail.seatNumber}, #{detail.count})" +
      "</foreach>" +
      "</script>")
  int insertBillingDetails(@Param("billingDetails") List<BillingDetail> billingDetails);

  // 결제 준비 완료시 tid 업데이트 및 결제 상태 업데이트
  @Update("UPDATE billing SET tid = #{tid}, status = #{status} WHERE reservation_id = #{reservationId}")
  int updateBillingWithTidAndStatus(@Param("reservationId") String reservationId, @Param("tid") String tid, @Param("status") String status);

  @Update("UPDATE billing SET status = #{status}, tid = #{tid}, pg_token = #{pgToken} WHERE reservation_id = #{reservationId}")
  void updateBillingStatusAndToken(@Param("reservationId") String reservationId, @Param("status") String status, @Param("tid") String tid, @Param("pgToken") String pgToken);

  @Update("UPDATE billing SET status = #{status} WHERE reservation_id = #{reservationId}")
  void updateBillingStatus(@Param("reservationId") String reservationId, @Param("status") String status);

  // 예약 존재 여부 유효성 체크(실패,취소 요청시)
  @Select("SELECT COUNT(*) FROM billing WHERE reservation_id = #{reservationId}")
  int existsByReservationId(@Param("reservationId") String reservationId);

  @Select("SELECT * FROM billing WHERE reservation_id = #{reservationId}")
  Optional<Billing> selectByReservationId(@Param("reservationId") String reservationId);
  // 조회시 null이 반환될 수 있어 optional 처리

  @Select("""
            SELECT a.art_id, a.title, t.timetable_id, CONCAT(t.date, ' ', t.start_time) AS viewingDateTime,
                   tt.user_type AS ticketType, SUM(tt.price) AS totalAmount, COUNT(tt.ticket_type_id) AS totalCount
            FROM billing b
            JOIN billing_detail bd ON b.billing_id = bd.billing_id
            JOIN timetable t ON bd.timetable_id = t.timetable_id
            JOIN art a ON t.art_id = a.art_id
            JOIN ticket_type tt ON bd.ticket_type_id = tt.ticket_type_id
            WHERE b.reservation_id = #{reservationId}
            GROUP BY a.art_id, a.title, t.timetable_id, t.date, t.start_time, tt.user_type
            """)
  List<ReservationTicketDetailDto> findTicketReservationByReservationId(@Param("reservationId") String reservationId);

  @Select("SELECT " +
      "b.art_id AS artId, " +
      "a.title AS title, " +
      "bd.timetable_id AS timetableId, " +
      "CONCAT(t.date, ' ', t.start_time) AS viewingDateTime, " +
      "GROUP_CONCAT(s.seat_number ORDER BY s.seat_number ASC) AS reservedSeats, " +
      "s.type AS seatType, " +
      "COUNT(s.seat_number) AS reservationCount, " +
      "b.total_amount AS totalAmount, " +
      "COUNT(s.seat_number) AS totalCount " +
      "FROM billing b " +
      "JOIN billing_detail bd ON b.billing_id = bd.billing_id " +
      "JOIN art a ON b.art_id = a.art_id " +
      "JOIN timetable t ON bd.timetable_id = t.timetable_id " +
      "JOIN seat s ON bd.seat_timetable_id = s.timetable_id AND bd.seat_number = s.seat_number " +
      "WHERE b.reservation_id = #{reservationId} " +
      "GROUP BY bd.timetable_id, s.type")
  List<ReservationSeatDetailDto> findReservationDetailsByReservationId(@Param("reservationId") String reservationId);

  @Select("""
            SELECT 
              a.art_id AS artId, 
              b.reservation_id AS reservationId, 
              a.title AS title, 
              CONCAT(t.date, ' ', t.start_time) AS viewingDateTime, 
              b.total_amount AS price 
            FROM 
              billing b 
            JOIN 
              billing_detail bd ON b.billing_id = bd.billing_id 
            JOIN 
              art a ON b.art_id = a.art_id 
            JOIN 
              timetable t ON bd.timetable_id = t.timetable_id 
            WHERE 
              b.status = 'PAYMENT_COMPLETED' 
            AND 
              b.booker_name = #{bookerName}
            """)
  List<BookHistoryDto> findCompletedBookingsByBookerName(@Param("bookerName") String bookerName);
}
