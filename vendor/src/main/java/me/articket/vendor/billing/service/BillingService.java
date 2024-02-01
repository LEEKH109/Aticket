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

  //추후에는 변수로 요청값을 넣어줘야 합니다.
  @Transactional
  public String preparePayment(PaymentPreparationDto paymentInfo) {
    // 헤더 설정
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
    headers.set("Authorization", "KakaoAK 667c2d03c60f1645bcdd746797aa0913");

    // convertToMultiValueMap 메서드를 사용하여 요청 본문 생성
    MultiValueMap<String, String> body = BillingUtil.convertToMultiValueMap(paymentInfo);

    // 로그 출력
    System.out.println("HTTP Headers: " + headers.toString());
    System.out.println("Request Body: " + body.toString());

    // RestTemplate을 사용하여 결제 준비 요청 보내기
    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);
    ResponseEntity<String> response = restTemplate.postForEntity(
        "https://kapi.kakao.com/v1/payment/ready", entity, String.class);

    // 응답 반환
    return response.getBody();
  }
  @Transactional
  public PaymentPreparationResDto createBillingAndExtractRedirectUrl(PaymentPreparationDto paymentInfo)
      throws JSONException {
    // 결제 준비 요청
    String paymentResponse = preparePayment(paymentInfo);

    // JSON 응답 파싱
    JSONObject json = new JSONObject(paymentResponse);
    String tid = json.getString("tid");
    String nextRedirectPcUrl = json.getString("next_redirect_pc_url");

    // Billing 객체 생성 및 저장 (예시 로직)
    Billing billing = new Billing();
    billing.setTid(tid);
    // billingRepository.save(billing);

    // 응답 객체 생성 및 반환
    return new PaymentPreparationResDto(tid, nextRedirectPcUrl);
  }

}
