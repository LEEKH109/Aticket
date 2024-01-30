package me.articket.vendor.seat.data;

import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class SeatTotalDtoRes {
    private int artId;
    private String category;
    private String date;
    private List<SeatDtoRes> seatInfo;
}
