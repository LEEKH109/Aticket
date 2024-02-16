package me.articket.server.billing.data;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationMainTicketResponseDto {

  private Long artId;
  private String reservationId;
  private String title;
  private Integer timetableId;
  private String viewingDateTime;
  private String posterUrl;
  private String location;
  private String reservationConfirmationDateTime;
  private Map<String, Integer> ticketType;
  private Integer totalAmount;
  private Integer totalCount;
}
