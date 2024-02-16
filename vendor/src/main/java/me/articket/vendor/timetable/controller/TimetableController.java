package me.articket.vendor.timetable.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import me.articket.vendor.seat.data.SeatTotalDtoRes;
import me.articket.vendor.seat.service.SeatService;
import me.articket.vendor.tickettype.data.TicketTotalDtoRes;
import me.articket.vendor.tickettype.service.TicketTypeService;
import me.articket.vendor.timetable.data.TimetableDtoRes;
import me.articket.vendor.timetable.domain.Timetable;
import me.articket.vendor.timetable.service.TimetableService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/time")
@RequiredArgsConstructor
public class TimetableController {

  private final TimetableService timetableService;
  private final TicketTypeService ticketTypeService;
  private final SeatService seatService;

  @GetMapping("/{artId}")
  public ResponseEntity<List<TimetableDtoRes>> getTimetableByArtId(
      @PathVariable("artId") int artId) {
    List<TimetableDtoRes> timetable = timetableService.getTimetableByArtId(artId);
    return ResponseEntity.ok(timetable);
  }

  @GetMapping("/{artId}/{date}")
  public ResponseEntity<List<Timetable>> getTimetableByDate(@PathVariable("artId") int artId,
      @PathVariable("date") String date) {
    System.out.println(date);
    List<Timetable> timetable = timetableService.getTimetableByDate(artId, date);
    return ResponseEntity.ok(timetable);
  }

  @GetMapping("/{timetableId}/tickets")
  public ResponseEntity<TicketTotalDtoRes> getTicketsForTimetable(
      @PathVariable("timetableId") int timetableId) {
    TicketTotalDtoRes tickets = ticketTypeService.getTicketForTimetable(timetableId);
    return ResponseEntity.ok(tickets);
  }

  @GetMapping("/{timetableId}/seats")
  public ResponseEntity<SeatTotalDtoRes> getSeatsForTimetable(
      @PathVariable("timetableId") int timetableId) {
    SeatTotalDtoRes seats = seatService.getSeatForTimetable(timetableId);
    return ResponseEntity.ok(seats);
  }
}
