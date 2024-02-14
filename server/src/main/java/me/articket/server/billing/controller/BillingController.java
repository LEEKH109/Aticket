package me.articket.server.billing.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import me.articket.server.billing.data.BillingApproveRequest;
import me.articket.server.billing.data.BillingApproveResponse;
import me.articket.server.billing.data.BillingCreateSeatRequest;
import me.articket.server.billing.data.BillingCreateTicketRequest;
import me.articket.server.billing.data.BillingPaymentCreatedResponse;
import me.articket.server.billing.data.ReservationMainSeatResponseDto;
import me.articket.server.billing.data.ReservationMainTicketResponseDto;
import me.articket.server.billing.data.UserReservationResponseDto;
import me.articket.server.billing.service.BillingService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/billing")
@RequiredArgsConstructor
public class BillingController {

  private final BillingService billingService;

  @Transactional
  @PostMapping("/reservation/ticket/{id}")
  public ResponseEntity<BillingPaymentCreatedResponse> billingPaymentCreateForTicket(
      @PathVariable Long id, @RequestBody
  BillingCreateTicketRequest request) {
    BillingPaymentCreatedResponse response = billingService.createBillingForTicket(id, request);
    return ResponseEntity.ok(response);
  }

  @Transactional
  @PostMapping("/reservation/seat/{id}")
  public BillingPaymentCreatedResponse billingPaymentCreateForSeat(@PathVariable Long id,
      @RequestBody
      BillingCreateSeatRequest request) {
    return billingService.createBillingForSeat(id, request);
  }

  @Transactional
  @PostMapping("/approve/{reservationId}")
  public BillingApproveResponse requestBillingApprove(@PathVariable String reservationId,
      @RequestBody BillingApproveRequest request) {
    return billingService.requestApprovePayment(reservationId, request);
  }

  @Transactional
  @GetMapping("history/ticket/{reservationId}")
  public ResponseEntity<List<ReservationMainTicketResponseDto>> getReservationDetails(@PathVariable String reservationId) {
    List<ReservationMainTicketResponseDto> response = billingService.getReservationDetails(reservationId);
    if (response.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(response);
  }

  @Transactional
  @GetMapping("/history/seat/{reservationId}")
  public ResponseEntity<List<ReservationMainSeatResponseDto>> getReservationSeatDetails(@PathVariable String reservationId) {
    List<ReservationMainSeatResponseDto> response = billingService.getReservationSeatDetails(reservationId);
    if (response.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(response);
  }

  @GetMapping("/history/{userId}")
  public ResponseEntity<List<UserReservationResponseDto>> getUserReservations(@PathVariable Long userId) {
    List<UserReservationResponseDto> reservations = billingService.getUserReservations(userId);
    if (reservations.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(reservations);
  }

  @GetMapping("/history/reservation/{reservationId}")
  public ResponseEntity<?> getReservationDetailsUnified(@PathVariable String reservationId) {
    try {
      return ResponseEntity.ok(billingService.getUnifiedReservationDetails(reservationId));
    } catch (ResponseStatusException e) {
      return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
    }
  }


}
