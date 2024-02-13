package me.articket.server.billing.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import me.articket.server.art.domain.Art;
import me.articket.server.art.repository.ArtRepository;
import me.articket.server.billing.data.BillingApproveRequest;
import me.articket.server.billing.data.BillingApproveResponse;
import me.articket.server.billing.data.BillingCategory;
import me.articket.server.billing.data.BillingCreateSeatRequest;
import me.articket.server.billing.data.BillingCreateTicketRequest;
import me.articket.server.billing.data.BillingPaymentCreatedResponse;
import me.articket.server.billing.data.ReservationMainTicketResponseDto;
import me.articket.server.billing.data.ReservationVendorTicketResponseDto;
import me.articket.server.billing.domain.Billing;
import me.articket.server.billing.repository.BillingRepository;
import me.articket.server.user.domain.User;
import me.articket.server.user.repository.UserRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class BillingService {

  private final ArtRepository artRepository;
  private final UserRepository userRepository;
  private final BillingRepository billingRepository;
  private final RestTemplate restTemplate;
  @Value("${external-service-url}")
  private String externalServiceUrl;

  // POST: /billing/reservation/ticket
  public BillingPaymentCreatedResponse createBillingForTicket(Long id,
      BillingCreateTicketRequest request) {
    // artId 유효성 검사
    boolean existArtId = artRepository.existsById(request.getArtId());
    boolean existUserId = userRepository.existsById(id);
    if (!existUserId) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Request");
    } else if (!existArtId) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid artId");
    }
    // 1단계) Billing 객체 생성하기 / status - PAYMENT_CREATED
    Billing billing = new Billing();
    BillingCreateTicketRequest requestVendor = new BillingCreateTicketRequest();
    // 2단계) ReservationId 생성하기
    //  => ticket : 년도 + "T" + 월 + 일 + RandomText 영어 숫자 랜덤 20자리
    LocalDateTime now = LocalDateTime.now();
    String reservationId = String.format("%dT%d%d%s",
        now.getYear(), now.getMonthValue(), now.getDayOfMonth(),
        RandomStringUtils.randomAlphanumeric(20).toUpperCase());
    // 전부 UpperCase 적용
    // 3단계) Billing 객체 중 동일한 ReservationId를 가진 객체가 있는지 유효성 체크
    if (billingRepository.existsByReservationId(reservationId)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Duplicate Reservation ID");
    }
    // 4단계) Billing 정보 입력하기
    User user = userRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    billing.setUser(user);
    billing.setArt(artRepository.findById(request.getArtId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Art not found")));
    billing.setReservationId(reservationId);
    billing.setStatus(BillingCategory.PAYMENT_CREATED);
    requestVendor.setArtId(request.getArtId());
    requestVendor.setReservationId(reservationId);
    requestVendor.setTimetableId(request.getTimetableId());
    requestVendor.setBookerName(user.getName());
    requestVendor.setTickets(request.getTickets());
    System.out.println(requestVendor);
    // 5단계) Billing 객체 DB 등록
    billing = billingRepository.save(billing);
    // 6단계) 벤더 서버에 결제 사전 준비 요청
    String url = externalServiceUrl + "/billing/reservation/ticket";
    ResponseEntity<BillingPaymentCreatedResponse> response = restTemplate.postForEntity(url,
        requestVendor, BillingPaymentCreatedResponse.class);
    System.out.println(response);
    // 8단계) 외부 서버의 응답 반환
    if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
      // 7단계 - 요청 성공) Billing status  PAYMENT_PENDING  으로 변경
      billing.setStatus(BillingCategory.PAYMENT_PENDING);
      billingRepository.save(billing);
      return response.getBody();
    } else {
      // 7단계 - 요청 실패) Billing status  PAYMENT_FAILED  로 변경
      billing.setStatus(BillingCategory.PAYMENT_FAILED);
      billingRepository.save(billing);
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get Response");
    }
  }

  // POST: /billing/reservation/seat
  public BillingPaymentCreatedResponse createBillingForSeat(Long id,
      BillingCreateSeatRequest request) {
    // 유효성 검사
    if (!artRepository.existsById(request.getArtId())) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Request");
    } else if (!userRepository.existsById(id)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid artId");
    }
    // 1단계) Billing 객체 생성하기 / status - PAYMENT_CREATED
    Billing billing = new Billing();
    // 2단계) ReservationId 생성하기
    //  => ticket : 년도 + "T" + 월 + 일 + RandomText 영어 숫자 랜덤 20자리
    LocalDateTime now = LocalDateTime.now();
    String reservationId = String.format("%dT%d%d%s",
        now.getYear(), now.getMonthValue(), now.getDayOfMonth(),
        RandomStringUtils.randomAlphanumeric(20).toUpperCase());
    // 전부 UpperCase 적용
    // 3단계) Billing 객체 중 동일한 ReservationId를 가진 객체가 있는지 유효성 체크
    if (billingRepository.existsByReservationId(reservationId)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Duplicate Reservation ID");
    }
    // 4단계) Billing 정보 입력하기
    User user = userRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    billing.setUser(user);
    billing.setArt(artRepository.findById(request.getArtId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Art not found")));
    billing.setReservationId(reservationId);
    billing.setStatus(BillingCategory.PAYMENT_CREATED);
    BillingCreateSeatRequest requestVendor = new BillingCreateSeatRequest();
    requestVendor.setArtId(request.getArtId());
    requestVendor.setReservationId(reservationId);
    requestVendor.setBookerName(user.getName());
    requestVendor.setSeats(request.getSeats());
    // 5단계) Billing 객체 DB 등록
    billing = billingRepository.save(billing);
    // 6단계) 벤더 서버에 결제 사전 준비 요청
    String url = externalServiceUrl + "/billing/reservation/seat";
    ResponseEntity<BillingPaymentCreatedResponse> response = restTemplate.postForEntity(url,
        requestVendor, BillingPaymentCreatedResponse.class);
    // 8단계) 외부 서버의 응답 반환
    if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
      // 7단계 - 요청 성공) Billing status  PAYMENT_PENDING  으로 변경
      billing.setStatus(BillingCategory.PAYMENT_PENDING);
      billingRepository.save(billing);
      return response.getBody();
    } else {
      // 7단계 - 요청 실패) Billing status  PAYMENT_FAILED  로 변경
      billing.setStatus(BillingCategory.PAYMENT_FAILED);
      billingRepository.save(billing);
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get Response");
    }
  }

  // POST: /billing/approve/{reservationId}
  public BillingApproveResponse requestApprovePayment(String reservationId,
      BillingApproveRequest request) {
    // 유효성 검사
    if (!userRepository.existsById(request.getUserId())) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Request");
    } else if (!billingRepository.existsByReservationId(reservationId)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Reservation");
    }
    Optional<Billing> optionalBilling = billingRepository.findByReservationId(reservationId);
    if (optionalBilling.isPresent()) {
      Billing billing = optionalBilling.get();
      String url = externalServiceUrl + "/billing/approve/" + reservationId + "?pgToken="
          + request.getPgToken();
      ResponseEntity<BillingApproveResponse> response = restTemplate.postForEntity(url, null,
          BillingApproveResponse.class);
      if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
        billing.setStatus(BillingCategory.PAYMENT_COMPLETED);
        billing.setReservationConfirmationDateTime(
            LocalDateTime.parse(response.getBody().getApprovedAt()));
        billingRepository.save(billing);
        return response.getBody();
      } else {
        billing.setStatus(BillingCategory.PAYMENT_FAILED);
        billingRepository.save(billing);
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
            "Failed to get Response");
      }
    } else {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Billing not found");
    }
  }
  // POST: /billing/fail/{reservationId}

  // POST: /billing/cancel/{reservationId}



  // GET: /billing/ticket/{reservationId}
  public List<ReservationMainTicketResponseDto> getReservationDetails(String reservationId) {
    // 요청 URL 로그 출력
    String requestUrl = externalServiceUrl + "/billing/reservation/ticket/" + reservationId;
    System.out.println("Requesting Vendor server with URL: " + requestUrl);

    // 예: 인증이 필요한 경우 헤더에 인증 정보 추가 (필요한 경우에만 사용)
    // HttpHeaders headers = new HttpHeaders();
    // headers.set("Authorization", "Bearer " + yourAuthToken);
    // HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

    ResponseEntity<List<ReservationVendorTicketResponseDto>> responseEntity = restTemplate.exchange(
        requestUrl,
        HttpMethod.GET,
        null, // new HttpEntity<>(headers)를 사용하여 인증이 필요한 경우 헤더 추가
        new ParameterizedTypeReference<List<ReservationVendorTicketResponseDto>>() {});

    // ResponseEntity 및 상태 코드 로그 출력
    System.out.println("Received response status code: " + responseEntity.getStatusCode());

    if (!responseEntity.getStatusCode().is2xxSuccessful() || responseEntity.getBody() == null) {
      System.err.println("Error: Vendor server responded with status code: " + responseEntity.getStatusCode());
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor reservations not found for " + reservationId);
    }

    List<ReservationVendorTicketResponseDto> vendorResponses = responseEntity.getBody();

    return vendorResponses.stream().map(vendorResponse -> {
      // Art 및 Billing 정보 조회 로그
      System.out.println("Fetching Art information for Art ID: " + vendorResponse.getArtId());
      var artOpt = artRepository.findById(vendorResponse.getArtId());

      System.out.println("Fetching Billing information for Reservation ID: " + reservationId);
      var billingOpt = billingRepository.findByReservationId(reservationId);

      if (artOpt.isEmpty() || billingOpt.isEmpty()) {
        System.err.println("Additional information not found for Art ID " + vendorResponse.getArtId() + " or Reservation ID " + reservationId);
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Additional information not found for Art ID " + vendorResponse.getArtId() + " or Reservation ID " + reservationId);
      }

      var art = artOpt.get();
      var billing = billingOpt.get();

      return new ReservationMainTicketResponseDto(
          vendorResponse.getArtId(),
          reservationId,
          vendorResponse.getTitle(),
          vendorResponse.getTimetableId(),
          vendorResponse.getViewingDateTime(),
          art.getPosterUrl(),
          art.getLocation(),
          billing.getReservationConfirmationDateTime() != null ? billing.getReservationConfirmationDateTime().toString() : null,
          vendorResponse.getTicketType(),
          vendorResponse.getTotalAmount(),
          vendorResponse.getTotalCount());
    }).collect(Collectors.toList());
  }
}
