package me.articket.vendor.billing.data;

import java.util.HashMap;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationTicketDetailResponseDto {

  private int artId;
  private String title;
  private Integer timetableId;
  private String viewingDateTime;
  private Map<String, Integer> ticketType;
  private Integer totalAmount;
  private Integer totalCount;
}
