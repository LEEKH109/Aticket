package me.articket.vendor.seat.service;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import me.articket.vendor.art.domain.Art;
import me.articket.vendor.art.repository.ArtRepository;
import me.articket.vendor.seat.data.SeatReservationInfoDto;
import me.articket.vendor.seat.data.SeatReservationRequestDto;
import me.articket.vendor.seat.data.SeatReservationRequestDto.BookedSeats;
import me.articket.vendor.seat.data.SeatTotalDtoRes;
import me.articket.vendor.seat.repository.SeatRepository;
import me.articket.vendor.timetable.data.TimetableDetailDtoRes;
import me.articket.vendor.timetable.domain.Timetable;
import me.articket.vendor.timetable.repository.TimetableRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SeatService {

  private final ArtRepository artRepository;
  private final TimetableRepository timetableRepository;
  private final SeatRepository seatRepository;

  public SeatTotalDtoRes getSeatForTimetable(int timetableId) {
    TimetableDetailDtoRes timetableDetail = timetableRepository.findTimetableDetailsByTimetableId(
        timetableId);
    List<SeatTotalDtoRes.SeatDtoRes> seats = seatRepository.findSeatByTimetableId(timetableId);

    SeatTotalDtoRes response = new SeatTotalDtoRes();
    response.setArtId(timetableDetail.getArtId());
    response.setCategory(timetableDetail.getCategory());
    response.setDate(timetableDetail.getDate());
    response.setSeatInfo(seats);

    return response;
  }
  public void SeatValidationCheck(SeatReservationRequestDto request){
    // 공연 존재여부 유효성 검사
    if(seatRepository.countSeatValidArtId(request.getArtId()) == 0){
      throw new IllegalArgumentException("Invalid artId.");
    }
    // 각 좌석에 대한 유효성 검사
    for(SeatReservationRequestDto.BookedSeats bookedSeats : request.getSeats()){
      String seatStatus = seatRepository.checkSeatValidation(bookedSeats.getTimetableId(),
          bookedSeats.getSeatNumber());
      switch (seatStatus) {
        case "NOT_EXISTS":
          throw new IllegalArgumentException("Seat does not exist: " + bookedSeats.getSeatNumber());
        case "RESERVED":
          throw new IllegalArgumentException(
              "Seat is already reserved: " + bookedSeats.getSeatNumber());
      }
    }
  }

  @Transactional(readOnly = true)
  public SeatReservationInfoDto processSeatReservation(SeatReservationRequestDto requestDto) {

    // 결과 DTO 생성 및 반환
    SeatReservationInfoDto infoDto = new SeatReservationInfoDto();

    // Art(공연) 정보 조회
    Art art = artRepository.selectArt(requestDto.getArtId());
    // Art id,title 설정
    infoDto.setArtId(requestDto.getArtId());
    infoDto.setArtTitle(art.getTitle());
    // 예약번호, 예약자 설정
    infoDto.setReservationId(requestDto.getReservationId());
    infoDto.setBookerName(requestDto.getBookerName());
    // 좌석 정보없는 경우 예외처리
    if (!requestDto.getSeats().isEmpty()) {
      // timetable id 추출
      int timetableId = requestDto.getSeats().get(0).getTimetableId();
      // timetable id 설정
      infoDto.setTimetableId(timetableId);
      // 해당 timetableId 기반 정보 조회
      Timetable timetableDetail = timetableRepository.findTimetableByTimetableId(timetableId);
      // startTime, endTime 설정
      infoDto.setStartTime(timetableDetail.getStartTime());
      infoDto.setEndTime(timetableDetail.getEndTime());
      // 요청된 좌석 번호 추출
      List<String> seatNumbers = requestDto.getSeats().stream()
          .map(BookedSeats::getSeatNumber)
          .collect(Collectors.toList());
      // 아주 오묘한 문법입니다.
      // 좌석 정보 조회
      List<SeatReservationInfoDto.SeatInfo> seatInfos = seatRepository.findSeatReservationInfo(requestDto.getArtId(), timetableId, seatNumbers);
      // DB 조회한 최신 좌석 정보 설정
      infoDto.setSeats(seatInfos);
      // 총 예약 좌석 수와 총 금액 계산
      int totalSeats = seatInfos.size();
      int totalAmount = seatInfos.stream().mapToInt(SeatReservationInfoDto.SeatInfo::getPrice).sum();
      // 좌석 수, 총 금액 설정
      infoDto.setTotalSeats(totalSeats);
      infoDto.setTotalAmount(totalAmount);
    }
    return infoDto;
  }
}
