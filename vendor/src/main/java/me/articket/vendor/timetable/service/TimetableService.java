package me.articket.vendor.timetable.service;

import lombok.RequiredArgsConstructor;
import me.articket.vendor.timetable.data.TimetableDtoRes;
import me.articket.vendor.timetable.domain.Timetable;
import me.articket.vendor.timetable.repository.TimetableRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TimetableService {
    private final TimetableRepository timetableRepository;
    public Timetable selectTimetable(int artId){
        return timetableRepository.selectTimetable(artId);
    }
    public List<TimetableDtoRes> getTimetableByArtId(int artId) {
        return timetableRepository.findTimetableByArtId(artId);
    }
    public List<Timetable> getTimetableByDate(int artId, String date){
        return timetableRepository.findTimetableByDate(artId, date);
    }

}
