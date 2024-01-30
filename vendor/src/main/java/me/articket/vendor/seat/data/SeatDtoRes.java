package me.articket.vendor.seat.data;

import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class SeatDtoRes {
    private Integer timetableId;
    private String seatNumber;
    private String status;
    private String type;
    private Integer price;
}
