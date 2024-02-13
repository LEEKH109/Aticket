package me.articket.vendor.billing.data;

import java.util.Map;
import lombok.Data;

@Data
public class ReservationSeatDetailResponseDto {

  private int artId;
  private String title;
  private Integer timetableId;
  private String viewingDateTime;
  private String reservedSeats;
  private Map<String, Integer> seatTypes;
  private Integer totalAmount;
  private Integer totalCount;
}
