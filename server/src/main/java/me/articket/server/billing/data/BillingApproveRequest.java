package me.articket.server.billing.data;

import lombok.Data;

@Data
public class BillingApproveRequest {
  private Long userId;
  private String pgToken;
}
