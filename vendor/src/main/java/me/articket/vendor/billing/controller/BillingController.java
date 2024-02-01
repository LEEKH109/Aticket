package me.articket.vendor.billing.controller;

import lombok.RequiredArgsConstructor;
import me.articket.vendor.billing.data.PaymentPreparationDto;
import me.articket.vendor.billing.data.ReservationSeatReqDto;
import me.articket.vendor.billing.data.ReservationTicketReqDto;
import me.articket.vendor.billing.service.BillingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/billing")
@RequiredArgsConstructor
public class BillingController {

  private final BillingService billingService;

  @PostMapping("/reservation/ticket")
  public ResponseEntity<?> reserveTicket(@RequestBody ReservationTicketReqDto request, @RequestBody PaymentPreparationDto paymentInfo) {
    // 유효성 검사
    billingService.prepareTicketReservation(request);
    // 결제 준비 요청
    String paymentResponse = billingService.preparePayment(paymentInfo);
    System.out.println(paymentResponse);
    // billingService.createBillingAndExtractRedirectUrl(paymentResponse);
    return ResponseEntity.ok(paymentResponse);
  }

  @PostMapping("/reservation/seat")
  public ResponseEntity<?> reserveSeat(@RequestBody ReservationSeatReqDto request, @RequestBody PaymentPreparationDto paymentInfo) {
    // 유효성 검사
    billingService.reserveSeats(request);
    // 결제 준비 요청
    String paymentResponse = billingService.preparePayment(paymentInfo);
    System.out.println(paymentResponse);
    return ResponseEntity.ok(paymentResponse);
  }

  @GetMapping("/approve/{paymentId}")
  public ResponseEntity<?> approvePayment(@PathVariable String paymentId, @RequestParam("pg_token") String pgToken) {
    // 결제 승인 로직 처리
    // 예: pgToken을 사용하여 카카오 결제 승인 API 호출
    System.out.println("PaymentId: " + paymentId);
    System.out.println("Received pg_token: " + pgToken);
    return ResponseEntity.ok("결제가 승인되었습니다.");
  }

  @GetMapping("/fail/{paymentId}")
  public ResponseEntity<?> failPayment(@PathVariable String paymentId) {
    // 결제 실패 처리
    return ResponseEntity.ok("결제가 실패하였습니다.");
  }

  @GetMapping("/cancel/{paymentId}")
  public ResponseEntity<?> cancelPayment(@PathVariable String paymentId) {
    // 결제 취소 처리
    return ResponseEntity.ok("결제가 취소되었습니다.");
  }

}
