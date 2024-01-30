package me.articket.vendor.tickettype.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import me.articket.vendor.tickettype.data.TicketTotalDtoRes;
import me.articket.vendor.tickettype.repository.TicketTyperRepository;
import me.articket.vendor.timetable.data.TimetableDetailDtoRes;
import me.articket.vendor.timetable.repository.TimetableRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TicketTypeService {

  private final TimetableRepository timetableRepository;
  private final TicketTyperRepository ticketTyperRepository;

  public TicketTotalDtoRes getTicketForTimetable(int timetableId) {
    TimetableDetailDtoRes timetableDetail = timetableRepository.findTimetableDetailsByTimetableId(
        timetableId);
    List<TicketTotalDtoRes.TicketTypeDtoRes> ticketType = ticketTyperRepository.findTicketTypesByTimetableId(
        timetableId);

    TicketTotalDtoRes response = new TicketTotalDtoRes();
    response.setArtId(timetableDetail.getArtId());
    response.setCategory(timetableDetail.getCategory());
    response.setDate(timetableDetail.getDate());
    response.setTicketTypes(ticketType);

    return response;
  }
}
