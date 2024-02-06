package me.articket.server.timetable.data;

import java.util.List;
import lombok.Data;

@Data
public class TimeSeatResponseDto {

  private Long artId;
  private String category;
  private String date;
  private List<SeatInfo> seatInfo;

  @Data
  public static class SeatInfo {
    private int timetableId;
    private String seatNumber;
    private String status;
    private String type;
    private int price;
  }

}
