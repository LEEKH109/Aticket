package me.articket.server.billing.data;

import lombok.Data;

@Data
public class BillingApproveResponse {

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
  private String viewingDateTime;

    @Data
    public static class Amount {

      private int total;
      private int taxFree;
      private int vat;
      private int discount;
      private int point;
    }
}
