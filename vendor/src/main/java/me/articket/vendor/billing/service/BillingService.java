package me.articket.vendor.billing.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import me.articket.vendor.art.repository.ArtRepository;
import me.articket.vendor.billing.data.PaymentPreparationResDto;
import me.articket.vendor.billing.domain.Billing;
import me.articket.vendor.billing.domain.Billing.BillingStatus;
import me.articket.vendor.billing.domain.BillingDetail;
import me.articket.vendor.billing.repository.BillingRepository;
import me.articket.vendor.billing.data.PaymentApprovalResponse;
import me.articket.vendor.seat.data.SeatReservationInfoDto;
import me.articket.vendor.tickettype.data.TicketReservationInfoDto;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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

  private final ArtRepository artRepository;
  private final BillingRepository billingRepository;

  //추후에는 변수로 요청값을 넣어줘야 합니다.
  @Transactional
  public PaymentPreparationResDto preparePaymentForSeat(SeatReservationInfoDto request) {
    if(!createBillingAndDetailsForSeats(request)){
      throw new RuntimeException("결제 정보 생성에 실패했습니다.");
    }
    // 헤더 설정
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
    headers.set("Authorization", "KakaoAK 667c2d03c60f1645bcdd746797aa0913");
    // 요청 본문 설정
    MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
    body.add("cid", "TC0ONETIME");
    body.add("partner_order_id", request.getReservationId());
    body.add("partner_user_id", request.getBookerName());
    body.add("item_name", request.getArtTitle());
    body.add("quantity", String.valueOf(request.getTotalSeats())); // 수량 설정 (예: 예약된 티켓의 수량)
    body.add("total_amount", String.valueOf(request.getTotalAmount())); // 총 금액 설정
    body.add("vat_amount", "0"); // 부가세 설정 => 전시-공연은 부가세 면제입니다.
    body.add("tax_free_amount", String.valueOf(request.getTotalAmount())); // 비과세 금액 설정
    body.add("approval_url",
        "http://localhost:8080/approve/" + request.getReservationId()); // 승인 URL 설정
    body.add("fail_url", "http://localhost:8080/fail/" + request.getReservationId()); // 실패 URL 설정
    body.add("cancel_url",
        "http://localhost:8080/cancel/" + request.getReservationId()); // 취소 URL 설정
    // 요청 로그 남기기
    System.out.println("HTTP Headers: " + headers.toString());
    System.out.println("Request Body: " + body.toString());
    // RestTemplate을 사용하여 요청 보내기
    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);
    ResponseEntity<String> response = restTemplate.postForEntity(
        "https://kapi.kakao.com/v1/payment/ready", entity, String.class);
// 카카오페이 응답에서 tid 추출 및 결제 상태 업데이트
    PaymentPreparationResDto paymentResponseDto = convertBillingAndExtractRedirectUrl(response.getBody());
    String tid = paymentResponseDto.getTid();
    // Billing 객체의 결제상태를 '결제준비'로 수정하고, tid 업데이트
    int updateCount = billingRepository.updateBillingWithTidAndStatus(request.getReservationId(), tid,
        String.valueOf(BillingStatus.PAYMENT_PENDING));
    if (updateCount != 1) {
      throw new RuntimeException("결제 정보 업데이트에 실패했습니다.");
    }
    // 응답 반환
    return convertBillingAndExtractRedirectUrl(response.getBody());
  }

  @Transactional
  public PaymentPreparationResDto preparePaymentForTicket(TicketReservationInfoDto request) {
    if(!createBillingAndDetailsForTickets(request)){
      throw new RuntimeException("결제 정보 생성에 실패했습니다.");
    }
    // 헤더 설정
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
    headers.set("Authorization", "KakaoAK 667c2d03c60f1645bcdd746797aa0913");
    // 요청 본문 설정
    MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
    body.add("cid", "TC0ONETIME");
    body.add("partner_order_id", request.getReservationId());
    body.add("partner_user_id", request.getBookerName());
    body.add("item_name", request.getArtTitle()); // 상품명 설정 (예: 예약한 공연 또는 전시의 이름)
    body.add("quantity", String.valueOf(request.getTotalTicketAmounts())); // 수량 설정 (예: 예약된 티켓의 수량)
    body.add("total_amount", String.valueOf(request.getTotalAmount())); // 총 금액 설정
    body.add("vat_amount", "0"); // 부가세 설정 - 전시,공연은 부가세 면제입니다.
    body.add("tax_free_amount", String.valueOf(request.getTotalAmount())); // 비과세 금액 설정
    body.add("approval_url",
        "http://localhost:8080/approve/" + request.getReservationId()); // 승인 URL 설정
    body.add("fail_url", "http://localhost:8080/fail/" + request.getReservationId()); // 실패 URL 설정
    body.add("cancel_url",
        "http://localhost:8080/cancel/" + request.getReservationId()); // 취소 URL 설정
    // 요청 로그 남기기
    System.out.println("HTTP Headers: " + headers.toString());
    System.out.println("Request Body: " + body.toString());
    // RestTemplate을 사용하여 요청 보내기
    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);
    ResponseEntity<String> response = restTemplate.postForEntity(
        "https://kapi.kakao.com/v1/payment/ready", entity, String.class);
    // 카카오페이 응답에서 tid 추출 및 결제 상태 업데이트
    PaymentPreparationResDto paymentResponseDto = convertBillingAndExtractRedirectUrl(response.getBody());
    String tid = paymentResponseDto.getTid();
    // Billing 객체의 결제상태를 '결제준비'로 수정하고, tid 업데이트
    int updateCount = billingRepository.updateBillingWithTidAndStatus(request.getReservationId(), tid,
        String.valueOf(BillingStatus.PAYMENT_PENDING));
    if (updateCount != 1) {
      throw new RuntimeException("결제 정보 업데이트에 실패했습니다.");
    }
    // 응답 반환
    return convertBillingAndExtractRedirectUrl(response.getBody());
  }

  @Transactional
  public PaymentPreparationResDto convertBillingAndExtractRedirectUrl(String response)
      throws JSONException {
    // JSON 응답 파싱
    JSONObject json = new JSONObject(response);
    String tid = json.getString("tid");
    String nextRedirectPcUrl = json.getString("next_redirect_pc_url");
    // Billing 객체 생성 및 저장 (추후 추가 예정)
    // 응답 객체 생성 및 반환
    return new PaymentPreparationResDto(tid, nextRedirectPcUrl);
  }

  @Transactional
  public boolean createBillingAndDetailsForTickets(TicketReservationInfoDto ticketInfo) {
    // Billing 객체 생성
    Billing billing = new Billing();
    // 생성시 필수 정보 삽입
    billing.setArtId(ticketInfo.getArtId());
    billing.setReservationId(ticketInfo.getReservationId());
    billing.setBookerName(ticketInfo.getBookerName());
    billing.setStatus(Billing.BillingStatus.PAYMENT_CREATED);
    billing.setCategory(artRepository.findCategoryNameByArtId(ticketInfo.getArtId()));
    billing.setTotalAmount(ticketInfo.getTotalAmount());
    // DB 등록
    int billingInserted = billingRepository.insertBilling(billing);
    if (billingInserted < 1) {
      // Billing 객체 생성 실패
      return false;
    }
    // BillingDetail 목록 생성
    List<BillingDetail> billingDetails = ticketInfo.getTickets().stream()
        .map(ticket
            -> {
          // BillingDetail 객체 생성
          BillingDetail detail = new BillingDetail();
          // 생성시 필수 정보 삽입
          detail.setBillingId(billing.getBillingId());
          detail.setTimetableId(ticketInfo.getTimetableTd());
          detail.setTicketTypeId(ticket.getTicketTypeId());
          detail.setSeatTimetableId(null);
          detail.setSeatNumber(null);
          detail.setCount(ticket.getCount());
          return detail;
        }).toList();
    int detailsInserted = billingRepository.insertBillingDetails(billingDetails);
    // 하나 이상의 BillingDetail 객체 생성 실패
    return detailsInserted == billingDetails.size();
    // 아래는 최적화 이전 코드
    // if(detailsInserted != billingDetails.size()) {
    // // 하나 이상의 BillingDetail 객체 생성 실패
    // return false;
    //}
    // return true;
  }

  @Transactional
  public boolean createBillingAndDetailsForSeats(SeatReservationInfoDto seatInfo){
    // Billing 객체 생성
    Billing billing = new Billing();
    // 생성시 필수 정보 삽입
    billing.setArtId(seatInfo.getArtId());
    billing.setReservationId(seatInfo.getReservationId());
    billing.setBookerName(seatInfo.getBookerName());
    billing.setStatus(BillingStatus.PAYMENT_CREATED);
    billing.setCategory(artRepository.findCategoryNameByArtId(seatInfo.getArtId()));
    billing.setTotalAmount(seatInfo.getTotalAmount());
    // DB 등록
    int billingInserted = billingRepository.insertBilling(billing);
    if (billingInserted < 1) {
      // Billing 객체 생성 실패
      return false;
    }
    // BillingDetail 목록 생성
    List<BillingDetail> billingDetails = seatInfo.getSeats().stream()
        .map(seat
            -> {
          // BillingDetail 객체 생성
          BillingDetail detail = new BillingDetail();
          // 생성시 필수 정보 삽입
          detail.setBillingId(billing.getBillingId());
          detail.setTimetableId(seatInfo.getTimetableId());
          detail.setTicketTypeId(null);
          detail.setSeatTimetableId(seatInfo.getTimetableId());
          detail.setSeatNumber(seat.getSeatNumber());
          detail.setCount(seatInfo.getTotalSeats());
          return detail;
        }).toList();
    int detailsInserted = billingRepository.insertBillingDetails(billingDetails);
    // 하나 이상의 BillingDetail 객체 생성 실패
    return detailsInserted == billingDetails.size();
  }

  // 유효성 체크 메서드 추가
  public boolean validateBilling(String reservationId, String tid) {
    return billingRepository.existsByReservationIdAndTid(reservationId, tid) <= 0;
  }
  public PaymentApprovalResponse updateBillingStatusToProcessing(String reservationId, String pgToken, String tid) {
    // 1. 결제 객체 조회 및 유효성 체크 동시 진행, optional 방식 첫 적용
    Billing billing = billingRepository.selectByReservationIdAndTid(reservationId, tid)
        .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 결제 정보입니다."));
    // 2. 결제 진행 중으로 진행 단계 수정
    billingRepository.updateBillingStatusAndToken(reservationId,
        String.valueOf(BillingStatus.PAYMENT_IN_PROGRESS), tid, pgToken);
    // 3. 카카오페이 결제 최종 승인 요청
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
    headers.set("Authorization", "KakaoAK 667c2d03c60f1645bcdd746797aa0913");

    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("cid", "TC0ONETIME");
    params.add("tid", billing.getTid());
    params.add("partner_order_id", billing.getReservationId());
    params.add("partner_user_id", billing.getBookerName());
    params.add("pg_token", pgToken);
    params.add("total_amount", String.valueOf(billing.getTotalAmount()));

    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);
    ResponseEntity<String> response = restTemplate.postForEntity("https://kapi.kakao.com/v1/payment/approve", requestEntity, String.class);

    // 4. 응답 처리
    if (response.getStatusCode() == HttpStatus.OK) {
      // 성공 응답 처리 로직
      billingRepository.updateBillingStatus(reservationId, String.valueOf(BillingStatus.PAYMENT_COMPLETED));
      // jsonResponse 변환해서 바로 PaymentApprovalResponse 응답 값 반환
      return parsePaymentApprovalResponse(response.getBody());
    } else {
      // 실패 응답 처리 로직
      billingRepository.updateBillingStatus(reservationId, String.valueOf(BillingStatus.PAYMENT_FAILED));
      throw new RuntimeException("결제 승인 실패: " + response.getBody());
    }
  }

  public void updateBillingStatusToFailed(String reservationId, String tid) {
    if (validateBilling(reservationId, tid)) {
      throw new IllegalArgumentException("유효하지 않은 결제 정보입니다.");
    }
    billingRepository.updateBillingStatus(reservationId, String.valueOf(BillingStatus.PAYMENT_FAILED));
  }

  public void updateBillingStatusToCancelled(String reservationId, String tid) {
    if (validateBilling(reservationId, tid)) {
      throw new IllegalArgumentException("유효하지 않은 결제 정보입니다.");
    }
    billingRepository.updateBillingStatus(reservationId, String.valueOf(BillingStatus.PAYMENT_CANCELLED));
  }

  public PaymentApprovalResponse parsePaymentApprovalResponse(String jsonResponse) {
    JSONObject json = new JSONObject(jsonResponse);
    PaymentApprovalResponse response = new PaymentApprovalResponse();

    response.setStatus("결제완료");
    response.setMessage("결제가 성공적으로 처리되었습니다.");
    response.setTid(json.getString("tid"));
    response.setPartnerUserId(json.getString("partner_user_id"));
    response.setPartnerOrderId(json.getString("partner_order_id"));
    response.setItemName(json.getString("item_name"));
    response.setQuantity(json.getInt("quantity"));

    PaymentApprovalResponse.Amount amount = new PaymentApprovalResponse.Amount();
    JSONObject jsonAmount = json.getJSONObject("amount");
    amount.setTotal(jsonAmount.getInt("total"));
    amount.setTaxFree(jsonAmount.getInt("tax_free"));
    amount.setVat(jsonAmount.getInt("vat"));
    amount.setDiscount(jsonAmount.getInt("discount"));
    amount.setPoint(jsonAmount.getInt("point"));
    response.setAmount(amount);

    response.setCreatedAt(json.getString("created_at"));
    response.setApprovedAt(json.getString("approved_at"));

    return response;
  }

}