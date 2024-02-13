package me.articket.vendor.billing.data;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookHistoryDto {

  private Integer artId;
  private String reservationId;
  private String title;
  private String viewingDateTime;
  private Integer price;
}
