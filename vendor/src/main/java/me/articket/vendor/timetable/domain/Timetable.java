package me.articket.vendor.timetable.domain;

import java.sql.Time;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class Timetable {

  private Integer timetableId;
  private Integer artId;
  private Integer categoryId;
  private String date;
  private Time startTime;
  private Time endTime;
  private Boolean status;
}

