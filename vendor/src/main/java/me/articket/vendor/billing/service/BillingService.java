package me.articket.vendor.billing.service;

import lombok.RequiredArgsConstructor;
import me.articket.vendor.billing.data.PaymentPreparationDto;
import me.articket.vendor.billing.data.PaymentPreparationResDto;
import me.articket.vendor.billing.data.ReservationSeatReqDto;
import me.articket.vendor.billing.data.ReservationTicketReqDto;
import me.articket.vendor.billing.domain.Billing;
import me.articket.vendor.billing.repository.BillingRepository;
import me.articket.vendor.billing.util.BillingUtil;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class BillingService {

  private final BillingRepository billingRepository;

  @Transactional
  public void prepareTicketReservation(ReservationTicketReqDto request) {
    // 전시-공연 존재여부 유효성 검사
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
  }

  @Transactional
  public void reserveSeats(ReservationSeatReqDto request) {
    // 전시-공연 존재여부 유효성 검사
    if (billingRepository.countValidArtId(request.getArtId()) == 0) {
      throw new IllegalArgumentException("Invalid artId.");
    }
    // 각 좌석에 대한 유효성 검사
    for (ReservationSeatReqDto.BookedSeat bookedSeat : request.getBookedSeatIdList()) {
      String seatStatus = billingRepository.checkSeatStatus(bookedSeat.getTimetableId(),
          bookedSeat.getSeatNumber());
      switch (seatStatus) {
        case "NOT_EXISTS":
          throw new IllegalArgumentException("Seat does not exist: " + bookedSeat.getSeatNumber());
        case "RESERVED":
          throw new IllegalArgumentException(
              "Seat is already reserved: " + bookedSeat.getSeatNumber());
      }
    }
    System.out.println("ByeWorld");

  }
  @Transactional
  public void createBilling(ReservationTicketReqDto request){

  }
  //추후에는 변수로 요청값을 넣어줘야 합니다.
  @Transactional
  public PaymentPreparationResDto preparePaymentForTicket(ReservationTicketReqDto request) {
    // 헤더 설정
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
    headers.set("Authorization", "KakaoAK 667c2d03c60f1645bcdd746797aa0913");
    // 요청 본문 설정
    MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
    body.add("cid", "TC0ONETIME");
    body.add("partner_order_id", "partner_order_id1234");
    body.add("partner_user_id", "partner_user_id1234");
    body.add("item_name", "상품명"); // 상품명 설정 (예: 예약한 공연 또는 전시의 이름)
    body.add("quantity", "1"); // 수량 설정 (예: 예약된 티켓의 수량)
    body.add("total_amount", "22000"); // 총 금액 설정
    body.add("vat_amount", "2000"); // 부가세 설정
    body.add("tax_free_amount", "0"); // 비과세 금액 설정
    body.add("approval_url", "http://localhost:8080/approve/test"); // 승인 URL 설정
    body.add("fail_url", "http://localhost:8080/fail/{paymentId}"); // 실패 URL 설정
    body.add("cancel_url", "http://localhost:8080/cancel/{paymentId}"); // 취소 URL 설정
    // 요청 로그 남기기
    System.out.println("HTTP Headers: " + headers.toString());
    System.out.println("Request Body: " + body.toString());
    // RestTemplate을 사용하여 요청 보내기
    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);
    ResponseEntity<String> response = restTemplate.postForEntity("https://kapi.kakao.com/v1/payment/ready", entity, String.class);

    // 응답 반환
    return createBillingAndExtractRedirectUrl(response.getBody());
  }

  @Transactional
  public PaymentPreparationResDto preparePaymentForSeat(ReservationSeatReqDto request) {
    // 헤더 설정
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
    headers.set("Authorization", "KakaoAK 667c2d03c60f1645bcdd746797aa0913");
    // 요청 본문 설정
    MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
    body.add("cid", "TC0ONETIME");
    body.add("partner_order_id", "partner_order_id1234");
    body.add("partner_user_id", "partner_user_id1234");
    body.add("item_name", "상품명"); // 상품명 설정 (예: 예약한 공연 또는 전시의 이름)
    body.add("quantity", "1"); // 수량 설정 (예: 예약된 티켓의 수량)
    body.add("total_amount", "22000"); // 총 금액 설정
    body.add("vat_amount", "2000"); // 부가세 설정
    body.add("tax_free_amount", "0"); // 비과세 금액 설정
    body.add("approval_url", "http://localhost:8080/approve/test"); // 승인 URL 설정
    body.add("fail_url", "http://localhost:8080/fail/{paymentId}"); // 실패 URL 설정
    body.add("cancel_url", "http://localhost:8080/cancel/{paymentId}"); // 취소 URL 설정
    // 요청 로그 남기기
    System.out.println("HTTP Headers: " + headers.toString());
    System.out.println("Request Body: " + body.toString());
    // RestTemplate을 사용하여 요청 보내기
    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);
    ResponseEntity<String> response = restTemplate.postForEntity("https://kapi.kakao.com/v1/payment/ready", entity, String.class);
    // 응답 반환
    return createBillingAndExtractRedirectUrl(response.getBody());
  }
  @Transactional
  public PaymentPreparationResDto createBillingAndExtractRedirectUrl(String response)
      throws JSONException {
    // JSON 응답 파싱
    JSONObject json = new JSONObject(response);
    String tid = json.getString("tid");
    String nextRedirectPcUrl = json.getString("next_redirect_pc_url");
    // Billing 객체 생성 및 저장 (추후 추가 예정)
    // 응답 객체 생성 및 반환
    return new PaymentPreparationResDto(tid, nextRedirectPcUrl);
  }

}
