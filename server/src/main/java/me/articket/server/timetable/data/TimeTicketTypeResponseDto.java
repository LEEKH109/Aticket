package me.articket.server.timetable.data;

import java.util.List;
import lombok.Data;

@Data
public class TimeTicketTypeResponseDto {

  private Long artId;
  private String category;
  private String date;
  private List<TicketType> ticketTypes;

  @Data
  public static class TicketType {
    private int ticketTypeId;
    private String userType;
    private int price;
  }
}
