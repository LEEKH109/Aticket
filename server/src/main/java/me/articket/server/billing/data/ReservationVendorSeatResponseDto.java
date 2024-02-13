package me.articket.server.billing.data;

import java.util.Map;
import lombok.Data;

@Data
public class ReservationVendorSeatResponseDto {

  private Long artId;
  private String title;
  private Long timetableId;
  private String viewingDateTime;
  private String reservedSeats;
  private Map<String, Integer> seatTypes;
  private Integer totalAmount;
  private Integer totalCount;
}
