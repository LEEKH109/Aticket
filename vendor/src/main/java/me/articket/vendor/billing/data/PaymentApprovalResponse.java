package me.articket.vendor.billing.data;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PaymentApprovalResponse {
  private String status;
  private String message;
  private String tid;
  private String partnerUserId;
  private String partnerOrderId;
  private String itemName;
  private int quantity;
  private Amount amount;
  private String createdAt;
  private String approvedAt;

  @Getter
  @Setter
  @NoArgsConstructor
  public static class Amount {
    private int total;
    private int taxFree;
    private int vat;
    private int discount;
    private int point;
  }
}
