package me.articket.vendor.tickettype.data;

import java.sql.Time;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.articket.vendor.tickettype.data.TicketReservationRequestDto.BookedTickets;

@NoArgsConstructor
@Getter
@Setter
public class TicketReservationInfoDto {
  private int artId;
  private String artTitle;
  private String reservationId;
  private String bookerName;
  private int timetableId;
  private Time startTime;
  private Time endTime;
  private int totalTicketAmounts;
  private int totalAmount;
  private List<BookedTickets> tickets;

  @NoArgsConstructor
  @Getter
  @Setter
  public static class BookedTickets {

    private int ticketTypeId;
    private int count;
    private int price;
  }
}
