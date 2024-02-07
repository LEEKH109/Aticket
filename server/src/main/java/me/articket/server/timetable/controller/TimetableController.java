package me.articket.server.timetable.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import me.articket.server.timetable.data.TimeSeatResponseDto;
import me.articket.server.timetable.data.TimeStatusDto;
import me.articket.server.timetable.data.TimeStatusResponseDto;
import me.articket.server.timetable.data.TimeTicketTypeResponseDto;
import me.articket.server.timetable.service.TimetableService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/time")
@RequiredArgsConstructor
public class TimetableController {

  private final TimetableService timetableService;

  @Transactional
  @GetMapping("/{artId}")
  public ResponseEntity<List<TimeStatusDto>> getTimeStatus(@PathVariable Long artId) {
    List<TimeStatusDto> timeStatusDto = timetableService.getTimeStatus(artId);
    return ResponseEntity.ok(timeStatusDto);
  }

  @GetMapping("/{artId}/{date}")
  public ResponseEntity<List<TimeStatusResponseDto>> getTimeStatusByDate(
      @PathVariable Long artId,
      @PathVariable String date) {
    List<TimeStatusResponseDto> timeStatusResponseList = timetableService.getTimeStatusByDate(artId, date);
    return ResponseEntity.ok(timeStatusResponseList);
  }

  @GetMapping("/{timetableId}/tickets")
  public ResponseEntity<TimeTicketTypeResponseDto> getTimeTickets(@PathVariable int timetableId) {
    TimeTicketTypeResponseDto response = timetableService.getTimeTickets(timetableId);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/{timetableId}/seats")
  public ResponseEntity<TimeSeatResponseDto> getTimeSeats(@PathVariable int timetableId){
    TimeSeatResponseDto response = timetableService.getTimeSeats(timetableId);
    return ResponseEntity.ok(response);
  }
}
