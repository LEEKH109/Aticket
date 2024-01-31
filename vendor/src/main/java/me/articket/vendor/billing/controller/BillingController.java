package me.articket.vendor.billing.controller;

import lombok.RequiredArgsConstructor;
import me.articket.vendor.billing.data.ReservationSeatReqDto;
import me.articket.vendor.billing.data.ReservationTicketReqDto;
import me.articket.vendor.billing.service.BillingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/billing")
@RequiredArgsConstructor
public class BillingController {

  private final BillingService billingService;

  @PostMapping("/reservation/ticket")
  public ResponseEntity<?> reserveTicket(@RequestBody ReservationTicketReqDto request) {
    billingService.prepareTicketReservation(request);
    return ResponseEntity.ok("Ticket reservation is being prepared");
  }

  @PostMapping("/reservation/seat")
  public ResponseEntity<?> reserveSeat(@RequestBody ReservationSeatReqDto request) {
    billingService.reserveSeats(request);
    return ResponseEntity.ok("Seat reservation is being processed");
  }

}
