package me.articket.vendor.billing.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import me.articket.vendor.art.repository.ArtRepository;
import me.articket.vendor.billing.data.BookHistoryDto;
import me.articket.vendor.billing.data.PaymentPreparationResDto;
import me.articket.vendor.billing.data.ReservationSeatDetailDto;
import me.articket.vendor.billing.data.ReservationSeatDetailResponseDto;
import me.articket.vendor.billing.data.ReservationTicketDetailDto;
import me.articket.vendor.billing.data.ReservationTicketDetailResponseDto;
import me.articket.vendor.billing.domain.Billing;
import me.articket.vendor.billing.domain.Billing.BillingStatus;
import me.articket.vendor.billing.domain.BillingDetail;
import me.articket.vendor.billing.repository.BillingRepository;
import me.articket.vendor.billing.data.PaymentApprovalResponse;
import me.articket.vendor.seat.data.SeatReservationInfoDto;
import me.articket.vendor.tickettype.data.TicketReservationInfoDto;
import me.articket.vendor.timetable.domain.Timetable;
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
        "http://i10a704.p.ssafy.io/billing/approve/" + request.getReservationId()); // 승인 URL 설정
    body.add("fail_url", "http://i10a704.p.ssafy.io/billing/fail/" + request.getReservationId()); // 실패 URL 설정
    body.add("cancel_url",
        "http://i10a704.p.ssafy.io/billing/cancel/" + request.getReservationId()); // 취소 URL 설정
    // 요청 로그 남기기
    System.out.println("HTTP Headers: " + headers.toString());
    System.out.println("Request Body: " + body.toString());
    // RestTemplate을 사용하여 요청 보내기
    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);
    ResponseEntity<String> response = restTemplate.postForEntity(
        "https://kapi.kakao.com/v1/payment/ready", entity, String.class);
    System.out.println(response);
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
        "http://i10a704.p.ssafy.io/billing/approve/" + request.getReservationId()); // 승인 URL 설정
    body.add("fail_url", "http://i10a704.p.ssafy.io/billing/fail/" + request.getReservationId()); // 실패 URL 설정
    body.add("cancel_url",
        "http://i10a704.p.ssafy.io/billing/cancel/" + request.getReservationId()); // 취소 URL 설정
    // 요청 로그 남기기
    System.out.println("HTTP Headers: " + headers.toString());
    System.out.println("Request Body: " + body.toString());
    // RestTemplate을 사용하여 요청 보내기
    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);
    ResponseEntity<String> response = restTemplate.postForEntity(
        "https://kapi.kakao.com/v1/payment/ready", entity, String.class);
    System.out.println(response);
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
    String nextRedirectMobileUrl = json.getString("next_redirect_mobile_url");
    // Billing 객체 생성 및 저장 (추후 추가 예정)
    // 응답 객체 생성 및 반환
    return new PaymentPreparationResDto(tid, nextRedirectPcUrl, nextRedirectMobileUrl);
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
          detail.setTimetableId(ticketInfo.getTimetableId());
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
  public boolean validateBilling(String reservationId) {
    return billingRepository.existsByReservationId(reservationId) <= 0;
  }
  public PaymentApprovalResponse updateBillingStatusToProcessing(String reservationId, String pgToken) {
    // 1. 결제 객체 조회 및 유효성 체크 동시 진행, optional 방식 첫 적용
    Billing billing = billingRepository.selectByReservationId(reservationId)
        .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 결제 정보입니다."));
    // 2. 결제 진행 중으로 진행 단계 수정
    billingRepository.updateBillingStatusAndToken(reservationId,
        String.valueOf(BillingStatus.PAYMENT_IN_PROGRESS), billing.getTid(), pgToken);
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
    System.out.println("end");
    System.out.println(response);
    // 4. 응답 처리
    if (response.getStatusCode() == HttpStatus.OK) {
      // 성공 응답 처리 로직
      billingRepository.updateBillingStatus(reservationId, String.valueOf(BillingStatus.PAYMENT_COMPLETED));
      // jsonResponse 변환해서 바로 PaymentApprovalResponse 응답 값 반환
      return parsePaymentApprovalResponse(response.getBody(),findViewingDateTimeByReservationId(reservationId));
    } else {
      // 실패 응답 처리 로직
      billingRepository.updateBillingStatus(reservationId, String.valueOf(BillingStatus.PAYMENT_FAILED));
      throw new RuntimeException("결제 승인 실패: " + response.getBody());
    }
  }

  public void updateBillingStatusToFailed(String reservationId) {
    if (validateBilling(reservationId)) {
      throw new IllegalArgumentException("유효하지 않은 결제 정보입니다.");
    }
    billingRepository.updateBillingStatus(reservationId, String.valueOf(BillingStatus.PAYMENT_FAILED));
  }

  public void updateBillingStatusToCancelled(String reservationId) {
    if (validateBilling(reservationId)) {
      throw new IllegalArgumentException("유효하지 않은 결제 정보입니다.");
    }
    billingRepository.updateBillingStatus(reservationId, String.valueOf(BillingStatus.PAYMENT_CANCELLED));
  }

  public PaymentApprovalResponse parsePaymentApprovalResponse(String jsonResponse,
      String viewingDateTimeByReservationId) {
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
    response.setViewingDateTime(viewingDateTimeByReservationId);

    return response;
  }

  public List<ReservationTicketDetailResponseDto> getTicketReservationInfo(String reservationId) {
    // 데이터베이스에서 TicketReservationDto 리스트 조회
    // billingRepository.findTicketReservationByReservationId(reservationId) 메소드는 예시이며,
    // 실제로 해당 메소드를 구현해야 합니다.
    List<ReservationTicketDetailDto> ticketReservationDtos = billingRepository.findTicketReservationByReservationId(reservationId);

    Map<String, ReservationTicketDetailResponseDto> responseMap = new HashMap<>();

    for (ReservationTicketDetailDto dto : ticketReservationDtos) {
      String key = dto.getArtId() + "-" + dto.getTimetableId(); // ArtId와 TimetableId를 키로 사용
      ReservationTicketDetailResponseDto responseDto = responseMap.computeIfAbsent(key, k -> new ReservationTicketDetailResponseDto(
          dto.getArtId(),
          dto.getTitle(),
          dto.getTimetableId(),
          dto.getViewingDateTime(),
          new LinkedHashMap<>(),
          0,
          0));

      // 티켓 유형과 수량을 맵에 추가
      responseDto.getTicketType().merge(dto.getTicketType(), dto.getTotalCount(), Integer::sum);
      // 총 금액과 총 수량 업데이트
      responseDto.setTotalAmount(responseDto.getTotalAmount() + (dto.getTotalAmount() * dto.getTotalCount()));
      responseDto.setTotalCount(responseDto.getTotalCount() + dto.getTotalCount());
    }

    return new ArrayList<>(responseMap.values());
  }

  public List<ReservationSeatDetailResponseDto> getSeatReservationDetails(String reservationId) {
    List<ReservationSeatDetailDto> details = billingRepository.findReservationDetailsByReservationId(reservationId);

    // 예약 ID별로 그룹화 후, 각 그룹을 AggregatedReservationDetailDto 객체로 변환
    return details.stream()
        .collect(Collectors.groupingBy(ReservationSeatDetailDto::getTimetableId))
        .entrySet().stream()
        .map(entry -> {
          List<ReservationSeatDetailDto> groupedDetails = entry.getValue();

          // 좌석 유형별로 카운팅
          Map<String, Integer> seatTypes = groupedDetails.stream()
              .collect(Collectors.toMap(
                  ReservationSeatDetailDto::getSeatType,
                  ReservationSeatDetailDto::getReservationCount,
                  Integer::sum));

          // 예약된 좌석 목록 생성
          String reservedSeats = groupedDetails.stream()
              .map(ReservationSeatDetailDto::getReservedSeats)
              .collect(Collectors.joining(", "));

          ReservationSeatDetailResponseDto aggregated = new ReservationSeatDetailResponseDto();
          aggregated.setArtId(groupedDetails.get(0).getArtId());
          aggregated.setTitle(groupedDetails.get(0).getTitle());
          aggregated.setTimetableId(entry.getKey());
          aggregated.setViewingDateTime(groupedDetails.get(0).getViewingDateTime());
          aggregated.setReservedSeats(reservedSeats);
          aggregated.setSeatTypes(seatTypes);
          aggregated.setTotalAmount(groupedDetails.get(0).getTotalAmount());
          aggregated.setTotalCount(groupedDetails.stream().mapToInt(ReservationSeatDetailDto::getTotalCount).sum());

          return aggregated;
        })
        .collect(Collectors.toList());
  }

  public List<BookHistoryDto> getCompletedBookingsByBookerName(String bookerName) {
    return billingRepository.findCompletedBookingsByBookerName(bookerName);
  }

  public String findViewingDateTimeByReservationId(String reservationId) {
    List<Timetable> timetables = billingRepository.findTimetablesByReservationId(reservationId);
    if (timetables.isEmpty()) {
      return "No timetable found for this reservation ID.";
    }
    Timetable timetable = timetables.get(0);
    try {
      LocalDate date = LocalDate.parse(timetable.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
      LocalTime startTime = timetable.getStartTime().toLocalTime(); // Assuming getStartTime() returns a java.sql.Time object

      LocalDateTime viewingDateTime = LocalDateTime.of(date, startTime);

      // Format the LocalDateTime to a string as per requirements
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
      return viewingDateTime.format(formatter);
    } catch (DateTimeParseException e) {
      // Handle the case where parsing fails
      return "Error parsing date or time.";
    }
  }
}
