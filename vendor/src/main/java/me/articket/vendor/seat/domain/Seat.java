package me.articket.vendor.seat.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class Seat {

  private Integer timetableId;
  private String seatNumber;
  private String status;
  private String type;
  private Integer price;
}

