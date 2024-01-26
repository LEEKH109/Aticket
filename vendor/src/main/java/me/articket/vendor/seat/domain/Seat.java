package me.articket.vendor.seat.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Seat {
    private Integer seatId;
    private Integer timetableId;
    private String seatNumber;
    private String status;
    private String type;
    private Integer price;
}

