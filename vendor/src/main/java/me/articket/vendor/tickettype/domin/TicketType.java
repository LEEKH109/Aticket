package me.articket.vendor.tickettype.domin;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class TicketType {

  private Integer ticketTypeId;
  private Integer timetableId;
  private String userType;
  private Integer price;
}

