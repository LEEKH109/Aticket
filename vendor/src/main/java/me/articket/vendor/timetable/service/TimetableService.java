package me.articket.vendor.timetable.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import me.articket.vendor.timetable.data.TimetableDtoRes;
import me.articket.vendor.timetable.domain.Timetable;
import me.articket.vendor.timetable.repository.TimetableRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TimetableService {

  private final TimetableRepository timetableRepository;

  public List<TimetableDtoRes> getTimetableByArtId(int artId) {
    return timetableRepository.findTimetableByArtId(artId);
  }

  public List<Timetable> getTimetableByDate(int artId, String date) {
    return timetableRepository.findTimetableByDate(artId, date);
  }

}
