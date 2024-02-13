package me.articket.server.billing.data;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationMainSeatResponseDto {

  private Long artId;
  private String title;
  private Long timetableId;
  private String viewingDateTime;
  private String posterUrl;
  private String location;
  private String reservationConfirmationDateTime;
  private String reservedSeats;
  private Map<String, Integer> seatTypes;
  private Integer totalAmount;
  private Integer totalCount;
}
