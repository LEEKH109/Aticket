package me.articket.vendor.billing.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class Billing {

  private int billingId;
  private int artId;
  private String reservationId; //주문 번호-벤더API에서 생성
  private String bookerName;
  private BillingStatus status; // ['결제생성', '결제준비', '결제진행중', '결제완료', '결제실패', '결제취소']
  private String category;
  private String tid; //결제 고유 번호-카카오페이API에서 생성
  private String pgToken; // pg토큰 값, tid와 함께 필수 값
  private int totalAmount;

  public enum BillingStatus {
    PAYMENT_CREATED, // 결제생성
    PAYMENT_PENDING, // 결제준비
    PAYMENT_IN_PROGRESS, // 결제진행중
    PAYMENT_COMPLETED, // 결제완료
    PAYMENT_FAILED, // 결제실패
    PAYMENT_CANCELLED // 결제취소
  }
}
