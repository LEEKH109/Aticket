package me.articket.vendor.seat.data;

import java.sql.Time;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class SeatReservationInfoDto {

  private int artId;
  private String artTitle;
  private String reservationId;
  private String bookerName;
  private int timetableId;
  private Time startTime;
  private Time endTime;
  private int totalSeats;
  private int totalAmount;
  private List<SeatInfo> seats;

  @NoArgsConstructor
  @Getter
  @Setter
  public static class SeatInfo {

    private String seatNumber;
    private String status;
    private int price;
  }
}
