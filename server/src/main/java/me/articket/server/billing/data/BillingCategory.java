package me.articket.server.billing.data;

public enum BillingCategory {
  // 결제 생성
  PAYMENT_CREATED,
  // 결제 준비
  PAYMENT_PENDING,
  // 결제 진행 중
  PAYMENT_IN_PROGRESS,
  // 결제 완료
  PAYMENT_COMPLETED,
  // 결제 실패
  PAYMENT_FAILED,
  // 결제 취소
  PAYMENT_CANCELLED
}
