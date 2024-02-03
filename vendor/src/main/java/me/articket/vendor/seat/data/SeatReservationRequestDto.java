package me.articket.vendor.seat.data;

import java.sql.Time;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.articket.vendor.billing.data.ReservationSeatReqDto.BookedSeat;

@NoArgsConstructor
@Getter
@Setter
public class SeatReservationRequestDto {

  private int artId;
  private String reservationId;
  private String bookerName;
  private List<BookedSeats> seats;

  @NoArgsConstructor
  @Getter
  @Setter
  public static class BookedSeats {

    private int timetableId;
    private String seatNumber;
  }
}
