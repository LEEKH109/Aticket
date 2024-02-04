package me.articket.vendor.billing.controller;

import lombok.RequiredArgsConstructor;
import me.articket.vendor.billing.data.PaymentPreparationDto;
import me.articket.vendor.billing.data.PaymentPreparationResDto;
import me.articket.vendor.billing.data.ReservationSeatReqDto;
import me.articket.vendor.billing.data.ReservationTicketReqDto;
import me.articket.vendor.billing.service.BillingService;
import me.articket.vendor.seat.data.SeatReservationInfoDto;
import me.articket.vendor.seat.data.SeatReservationRequestDto;
import me.articket.vendor.seat.service.SeatService;
import me.articket.vendor.tickettype.data.TicketReservationRequestDto;
import me.articket.vendor.tickettype.service.TicketTypeService;
import org.springframework.http.HttpStatus;
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
  private final SeatService seatService;
  private final TicketTypeService ticketTypeService;

  @PostMapping("/reservation/ticket")
  public ResponseEntity<?> reserveTicket(@RequestBody TicketReservationRequestDto request) {
    try {
      // 유효성 검사
      //  => 유효성 검사 통과 하지 못 하면 다음 로직으로 진행되지 않습니다.
      //  => 유효성 테스트는 각 도메인별로 이관, 미 통과시 예외처리 throw
      ticketTypeService.TicketValidationCheck(request);
      // 결제 준비 요청
      //  => 결제 준비 단계에서는 카카오페이 결제준비 와 해당 응답의 결과에 따라 billing 객체를 생성합니다.
      PaymentPreparationResDto paymentResponse = billingService.preparePaymentForTicket(
          ticketTypeService.processTicketReservation(request));
      System.out.println(paymentResponse);
      return ResponseEntity.ok(paymentResponse);
    } catch (IllegalArgumentException e){
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (RuntimeException e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    } catch (Exception e) {
      // 그 외 에러 처리
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류가 발생했습니다.");
    }
  }

  @PostMapping("/reservation/seat")
  public ResponseEntity<?> reserveSeat(@RequestBody SeatReservationRequestDto request) {
    try {
      // 유효성 검사
      //  => 유효성 검사 통과 하지 못 하면 다음 로직으로 진행되지 않습니다.
      seatService.SeatValidationCheck(request);
      // 결제 준비 요청
      //  => 결제 준비 단계에서는 카카오페이 결제준비 와 해당 응답의 결과에 따라 billing 객체를 생성합니다.
      PaymentPreparationResDto paymentPreparationResDto = billingService.preparePaymentForSeat(
          seatService.processSeatReservation(request));
      return ResponseEntity.ok(paymentPreparationResDto);
    }catch (IllegalArgumentException e){
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (RuntimeException e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    } catch (Exception e) {
      // 그 외 에러 처리
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류가 발생했습니다.");
    }
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
