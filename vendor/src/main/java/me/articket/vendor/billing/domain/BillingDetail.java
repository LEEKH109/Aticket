package me.articket.vendor.billing.domain;

import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class BillingDetail {
    private Integer billingDetailId;
    private Integer billingId;
    private Integer timetableId;
    private int tickettypeId;//변수명을 바꿔야 하나?
    private int seatId;
    private Integer count;//티켓 매수
}

