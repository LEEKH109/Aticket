package me.articket.vendor.tickettype.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import me.articket.vendor.art.domain.Art;
import me.articket.vendor.art.repository.ArtRepository;
import me.articket.vendor.tickettype.data.TicketReservationInfoDto;
import me.articket.vendor.tickettype.data.TicketReservationRequestDto;
import me.articket.vendor.tickettype.data.TicketTotalDtoRes;
import me.articket.vendor.tickettype.domin.TicketType;
import me.articket.vendor.tickettype.repository.TicketTypeRepository;
import me.articket.vendor.timetable.data.TimetableDetailDtoRes;
import me.articket.vendor.timetable.domain.Timetable;
import me.articket.vendor.timetable.repository.TimetableRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TicketTypeService {

  private final ArtRepository artRepository;
  private final TimetableRepository timetableRepository;
  private final TicketTypeRepository ticketTypeRepository;

  public TicketTotalDtoRes getTicketForTimetable(int timetableId) {
    TimetableDetailDtoRes timetableDetail = timetableRepository.findTimetableDetailsByTimetableId(
        timetableId);
    List<TicketTotalDtoRes.TicketTypeDtoRes> ticketType = ticketTypeRepository.findTicketTypesByTimetableId(
        timetableId);

    TicketTotalDtoRes response = new TicketTotalDtoRes();
    response.setArtId(timetableDetail.getArtId());
    response.setCategory(timetableDetail.getCategory());
    response.setDate(timetableDetail.getDate());
    response.setTicketTypes(ticketType);

    return response;
  }

  public void ticketValidationCheck(TicketReservationRequestDto request){
    // 전시 유효성 체크
    if(ticketTypeRepository.countSeatByArtId(request.getArtId()) == 0){
      throw new IllegalArgumentException("Invalid artId.");
    }
    if(ticketTypeRepository.countTimetableId(request.getTimetableId()) == 0){
      throw new IllegalArgumentException("Invalid timetableId.");
    }
    if (request.getTickets().stream().anyMatch(ticket -> ticketTypeRepository.countTicketTypeId(
        ticket.getTicketTypeId()) == 0)){
      throw new IllegalArgumentException("Invalid ticketTypeId.");
    }
  }

  public TicketReservationInfoDto processTicketReservation(TicketReservationRequestDto requestDto){

    // 결과 DTO 생성 및 반환
    TicketReservationInfoDto infoDto = new TicketReservationInfoDto();
    // Art(공연) 정보 조회
    Art art = artRepository.selectArt(requestDto.getArtId());
    // Art id,title 설정
    infoDto.setArtId(requestDto.getArtId());
    infoDto.setArtTitle(art.getTitle());
    // 예약번호, 예약자 설정
    infoDto.setReservationId(requestDto.getReservationId());
    infoDto.setBookerName(requestDto.getBookerName());
    // timetable 조회
    Timetable timetableDetail = timetableRepository.findTimetableByTimetableId(requestDto.getTimetableId());
    // timetableId, 시작 시간, 종료시간 설정
    infoDto.setTimetableId(timetableDetail.getTimetableId());
    infoDto.setStartTime(timetableDetail.getStartTime());
    infoDto.setEndTime(timetableDetail.getEndTime());
    // ticketTypeId 추출
    List<Integer> ticketTypeIds = requestDto.getTickets().stream().map(TicketReservationRequestDto.BookedTickets::getTicketTypeId).toList();
    // ticketTypes 리스트 조회
    List<TicketType> ticketTypes = ticketTypeRepository.findAllByIds(ticketTypeIds);
    // 요청된 티켓 정보를 기반으로 최종 예약 정보 구성
    List<TicketReservationInfoDto.BookedTickets> bookedTicketsInfo = requestDto.getTickets().stream().map(requestTicket -> {
      TicketType ticketType = ticketTypes.stream()
          .filter(tt -> tt.getTicketTypeId() == requestTicket.getTicketTypeId())
          .findFirst()
          .orElseThrow(() -> new IllegalArgumentException("Invalid ticketTypeId: " + requestTicket.getTicketTypeId()));

      TicketReservationInfoDto.BookedTickets bookedTicket = new TicketReservationInfoDto.BookedTickets();
      bookedTicket.setTicketTypeId(ticketType.getTicketTypeId());
      bookedTicket.setCount(requestTicket.getCount());
      bookedTicket.setPrice(ticketType.getPrice());
      return bookedTicket;
    }).toList();
    // 총 예약 티켓 수와 총 금액 계산
    int totalTicketCounts = bookedTicketsInfo.stream().mapToInt(TicketReservationInfoDto.BookedTickets::getCount).sum();
    int totalAmount = bookedTicketsInfo.stream().mapToInt(ticket -> ticket.getCount() * ticket.getPrice()).sum();
    // startTime, endTime 설정은 해당 타임테이블의 정보 조회를 통해 설정
    infoDto.setTotalTicketAmounts(totalTicketCounts);
    infoDto.setTotalAmount(totalAmount);
    infoDto.setTickets(bookedTicketsInfo);

    return infoDto;
  }
}
