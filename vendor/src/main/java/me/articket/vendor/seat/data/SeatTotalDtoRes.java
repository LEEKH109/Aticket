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

    @NoArgsConstructor
    @Getter
    @Setter
    public static class SeatDtoRes{
        private Integer timetableId;
        private String seatNumber;
        private String status;
        private String type;
        private Integer price;
    }
}
