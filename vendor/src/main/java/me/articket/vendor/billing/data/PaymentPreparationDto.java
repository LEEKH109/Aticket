package me.articket.vendor.billing.data;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PaymentPreparationDto {

  private String cid; // 가맹점 코드
  private String partnerOrderId; // 가맹점 주문번호
  private String partnerUserId; // 가맹점 회원 ID
  private String itemName; // 상품명
  private Integer quantity; // 상품 수량
  private Integer totalAmount; // 총 금액
  private Integer vatAmount; // 부가세
  private Integer taxFreeAmount; // 비과세 금액
  private String approvalUrl; // 결제 성공 시 리다이렉트 URL
  private String failUrl; // 결제 실패 시 리다이렉트 URL
  private String cancelUrl; // 결제 취소 시 리다이렉트 URL
}
