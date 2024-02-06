package me.articket.server.timetable.data;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Data;

@Data
public class TimeStatusResponseDto {
  private int timetableId;
  private Long artId;
  private Long categoryId;
  private String date;
  private LocalTime startTime;
  private LocalTime endTime;
  private boolean status;
}
