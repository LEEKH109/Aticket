package me.articket.server.billing.data;

import java.util.List;
import lombok.Data;

@Data
public class BillingCreateTicketRequest {

  private Long artId;
  private String reservationId;
  private int timetableId;
  private String bookerName;
  private List<TicketRequest> tickets;

  @Data
  public static class TicketRequest {

    private int ticketTypeId;
    private int count;
  }
}
