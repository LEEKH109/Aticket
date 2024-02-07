package me.articket.vendor.billing.data;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class PaymentPreparationResDto {

  private String tid;
  private String redirectUrlPc;
  private String redirectUrlMobile;
}