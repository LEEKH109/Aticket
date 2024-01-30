package me.articket.vendor.tickettype.data;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class TicketTotalDtoRes {

  private int artId;
  private String category;
  private String date;
  private List<TicketTypeDtoRes> ticketTypes;

  @NoArgsConstructor
  @Getter
  @Setter
  public static class TicketTypeDtoRes {

    private int ticketTypeId;
    private String userType;
    private int price;
  }
}
