package me.articket.server.billing.data;

import java.util.List;
import lombok.Data;

@Data
public class BillingCreateSeatRequest {

  private Long artId;
  private String reservationId;
  private String bookerName;
  private List<SeatRequest> seats;
  @Data
  public static class SeatRequest {

    private int timetableId;
    private String seatNumber;
  }
}
