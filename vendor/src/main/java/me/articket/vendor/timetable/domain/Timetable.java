package me.articket.vendor.timetable.domain;

import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.Date;

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

