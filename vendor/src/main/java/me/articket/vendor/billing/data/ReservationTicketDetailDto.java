package me.articket.vendor.billing.data;

import lombok.Data;

@Data
public class ReservationTicketDetailDto {

  private int artId;
  private String title;
  private int timetableId;
  private String viewingDateTime;
  private String ticketType;
  private int totalAmount;
  private int totalCount;
}
