package me.articket.vendor.billing.repository;

import java.util.List;
import me.articket.vendor.billing.domain.Billing;
import me.articket.vendor.billing.domain.BillingDetail;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface BillingRepository {

  // 결제 객체 생성, tid와 pg_token은 결제 진행 중 생성되는 값이라 null로 둡니다.
  @Insert("INSERT INTO billing (art_id, reservation_id, booker_name, status, category) " +
      "VALUES (#{artId}, #{reservationId}, #{bookerName}, #{status}, #{category})")
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
}
