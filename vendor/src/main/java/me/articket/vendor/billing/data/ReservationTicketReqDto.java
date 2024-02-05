package me.articket.vendor.billing.data;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ReservationTicketReqDto {

  private int artId;
  private String reservationId;
  private int timetableId;
  private String bookerName;
  private List<BookedTickets> bookedTickets;

  @NoArgsConstructor
  @Getter
  @Setter
  public static class BookedTickets {

    private int ticketTypeId;
    private int count;
  }

}
