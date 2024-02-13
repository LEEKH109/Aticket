package me.articket.vendor.billing.data;

import lombok.Data;

@Data
public class ReservationSeatDetailDto {

  private Integer artId;
  private String title;
  private Integer timetableId;
  private String viewingDateTime;
  private String reservedSeats;
  private String seatType;
  private Integer reservationCount;
  private Integer totalAmount;
  private Integer totalCount;
}