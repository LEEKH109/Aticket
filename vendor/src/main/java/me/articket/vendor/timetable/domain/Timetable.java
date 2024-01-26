package me.articket.vendor.timetable.domain;

import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.Date;

@Getter
@Setter
public class Timetable {
    private Integer timetableId;
    private Integer artId;
    private Integer categoryId;
    private Date date;
    private Time startTime;
    private Time endTime;
    private Boolean status;
}

