package me.articket.server.billing.data;

import lombok.Data;

@Data
public class BillingPaymentCreatedResponse {

  private String tid;
  private String redirectUrlPc;
  private String redirectUrlMobile;
}
