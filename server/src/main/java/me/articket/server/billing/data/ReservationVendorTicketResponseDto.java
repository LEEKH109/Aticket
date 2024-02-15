package me.articket.server.billing.data;

import java.util.Map;
import lombok.Data;

@Data
public class ReservationVendorTicketResponseDto {

  private Long artId;
  private String title;
  private Integer timetableId;
  private String viewingDateTime;
  private Map<String, Integer> ticketType;
  private Integer totalAmount;
  private Integer totalCount;
}
