package me.articket.vendor.billing.service;

import lombok.RequiredArgsConstructor;
import me.articket.vendor.billing.data.ReservationSeatReqDto;
import me.articket.vendor.billing.data.ReservationTicketReqDto;
import me.articket.vendor.billing.repository.BillingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BillingService {

  private final BillingRepository billingRepository;

  @Transactional
  public void prepareTicketReservation(ReservationTicketReqDto request) {
    if (billingRepository.countValidArtId(request.getArtId()) == 0) {
      throw new IllegalArgumentException("Invalid artId.");
    }
    if (billingRepository.countValidTimetableId(request.getTimetableId()) == 0) {
      throw new IllegalArgumentException("Invalid timetableId.");
    }
    if (request.getBookedTickets().stream().anyMatch(ticket ->
        billingRepository.countValidTicketTypeId(ticket.getTicketTypeId()) == 0)) {
      throw new IllegalArgumentException("Invalid ticketTypeId.");
    }
    System.out.println("HelloWorld");
    // 결제 준비 로직 구현
  }

  @Transactional
  public void reserveSeats(ReservationSeatReqDto request) {
    // 각 좌석에 대한 유효성 검사
    for (ReservationSeatReqDto.BookedSeat bookedSeat : request.getBookedSeatIdList()) {
      if (billingRepository.countValidTimetableId(bookedSeat.getTimetableId()) == 0) {
        throw new IllegalArgumentException("Invalid timetableId: " + bookedSeat.getTimetableId());
      }
      if (billingRepository.countValidSeatId(bookedSeat.getTimetableId(), bookedSeat.getSeatNumber()) == 0) {
        throw new IllegalArgumentException("Invalid seatId: " + bookedSeat.getSeatNumber());
      }
    }
    System.out.println("ByeWorld");
    // 결제 준비 로직 구현
  }
}
