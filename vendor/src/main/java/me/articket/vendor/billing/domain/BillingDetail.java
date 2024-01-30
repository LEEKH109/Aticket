package me.articket.vendor.billing.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class BillingDetail {

  private Integer billingDetailId;
  private Integer billingId;
  private Integer timetableId;
  private int ticketTypeId;
  private int seatId;
  private Integer count;//티켓 매수
}

