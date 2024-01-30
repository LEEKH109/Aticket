package me.articket.vendor.seat.service;

import lombok.RequiredArgsConstructor;
import me.articket.vendor.seat.data.SeatDtoRes;
import me.articket.vendor.seat.data.SeatTotalDtoRes;
import me.articket.vendor.seat.repository.SeatRepository;
import me.articket.vendor.timetable.data.TimetableDetailDtoRes;
import me.articket.vendor.timetable.repository.TimetableRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatService {
    private final TimetableRepository timetableRepository;
    private final SeatRepository seatRepository;

    public SeatTotalDtoRes getSeatForTimetable(int timetableId){
        TimetableDetailDtoRes timetableDetail = timetableRepository.findTimetableDetailsByTimetableId(timetableId);
        List<SeatDtoRes> seats = seatRepository.findSeatByTimetableId(timetableId);

        SeatTotalDtoRes response = new SeatTotalDtoRes();
        response.setArtId(timetableDetail.getArtId());
        response.setCategory(timetableDetail.getCategory());
        response.setDate(timetableDetail.getDate());
        response.setSeatInfo(seats);

        return response;
    }
}
