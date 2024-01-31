package me.articket.vendor.billing.data;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ReservationSeatReqDto {

  private int artId;
  private String reservationId;
  private String bookerName;
  private List<BookedSeat> bookedSeatIdList;

  @NoArgsConstructor
  @Getter
  @Setter
  public static class BookedSeat {

    private int timetableId;
    private String seatNumber;
  }
}
