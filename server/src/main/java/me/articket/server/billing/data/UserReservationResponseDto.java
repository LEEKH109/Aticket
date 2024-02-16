package me.articket.server.billing.data;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReservationResponseDto {

  private Long artId;
  private String reservationId;
  private String title;
  private String posterUrl;
  private LocalDateTime viewingDateTime;
  private LocalDateTime reservationConfirmationDateTime;
  private String location;
}
