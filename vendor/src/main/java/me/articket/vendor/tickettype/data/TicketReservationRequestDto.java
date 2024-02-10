package me.articket.vendor.tickettype.data;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class TicketReservationRequestDto {

  private int artId;
  private String reservationId;
  private int timetableId;
  private String bookerName;
  private List<BookedTickets> tickets;

  @NoArgsConstructor
  @Getter
  @Setter
  public static class BookedTickets {

    private int ticketTypeId;
    private int count;
  }
}
