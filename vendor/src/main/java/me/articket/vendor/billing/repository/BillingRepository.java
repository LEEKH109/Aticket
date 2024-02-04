package me.articket.vendor.billing.repository;

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

  // 전시를 위한 BillingDetail 생성(삽입)
  @Insert({
      "INSERT INTO billing_detail (billing_id, timetable_id, ticket_type_id, count) " +
      "VALUES (#{billingId}, #{timetableId}, #{ticketTypeId}, #{count})"
  })
  int insertBillingDetailForExhibition(BillingDetail billingDetail);

  // 공연을 위한 BillingDetail 생성(삽입)
  @Insert({
      "INSERT INTO billing_detail (billing_id, timetable_id, seat_id, count) " +
      "VALUES (#{billingId}, #{timetableId}, #{seatId}, #{count})"
  })
  int insertBillingDetailForPerformance(BillingDetail billingDetail);

  // 결제 준비 완료시 tid 업데이트
  @Update("UPDATE billing SET tid = #{tid} WHERE billing_id = #{billingId}")
  int updateBillingWithTid(@Param("billingId") int billingId, @Param("tid") String tid);
}
