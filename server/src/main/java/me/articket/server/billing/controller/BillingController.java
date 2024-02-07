package me.articket.server.billing.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.billing.data.BillingApproveRequest;
import me.articket.server.billing.data.BillingApproveResponse;
import me.articket.server.billing.data.BillingCreateSeatRequest;
import me.articket.server.billing.data.BillingCreateTicketRequest;
import me.articket.server.billing.data.BillingPaymentCreatedResponse;
import me.articket.server.billing.service.BillingService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/billing")
@RequiredArgsConstructor
public class BillingController {

  private final BillingService billingService;

  @Transactional
  @PostMapping("/reservation/ticket/{id}")
  public ResponseEntity<BillingPaymentCreatedResponse> billingPaymentCreateForTicket(@PathVariable Long id, @RequestBody
      BillingCreateTicketRequest request){
    BillingPaymentCreatedResponse response = billingService.createBillingForTicket(id, request);
    return ResponseEntity.ok(response);
  }

  @Transactional
  @PostMapping("/reservation/seat/{id}")
  public BillingPaymentCreatedResponse billingPaymentCreateForSeat(@PathVariable Long id, @RequestBody
  BillingCreateSeatRequest request){
    BillingPaymentCreatedResponse response = billingService.createBillingForSeat(id, request);
    return response;
  }

  @Transactional
  @PostMapping("/approve/{reservationId}")
  public BillingApproveResponse requestBillingApprove(@PathVariable String reservationId, @RequestBody BillingApproveRequest request ){
    BillingApproveResponse response= billingService.requestApprovePayment(reservationId, request);
    System.out.println("hello");
    return response;
  }

}
