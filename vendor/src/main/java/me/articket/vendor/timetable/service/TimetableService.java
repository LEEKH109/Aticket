package me.articket.vendor.timetable.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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
    List<TimetableDtoRes> timetable = timetableRepository.findTimetableByArtId(artId);

    List<TimetableDtoRes> filteredTimetable = timetable.stream()
        .filter(t -> LocalDate.parse(t.getDate()).isAfter(LocalDate.now()) || LocalDate.parse(t.getDate()).isEqual(LocalDate.now()))
        .toList();

    return filteredTimetable;
  }

  public List<Timetable> getTimetableByDate(int artId, String date) {
    List<Timetable> timetables = timetableRepository.findTimetableByDate(artId, date);

    LocalDate inputDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
    LocalDate today = LocalDate.now();
    LocalTime now = LocalTime.now();

    List<Timetable> filteredTimetables = timetables.stream()
        .filter(t -> {
          LocalTime startTime = t.getStartTime().toLocalTime();//타입 변환
          return !inputDate.equals(today) || (startTime.isAfter(now));
        }).toList();

    return filteredTimetables;
  }

}
