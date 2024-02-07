package me.articket.server.timetable.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import me.articket.server.art.repository.ArtRepository;
import me.articket.server.common.exception.CustomException;
import me.articket.server.timetable.data.TimeSeatResponseDto;
import me.articket.server.timetable.data.TimeStatusDto;
import me.articket.server.timetable.data.TimeStatusResponseDto;
import me.articket.server.timetable.data.TimeTicketTypeResponseDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class TimetableService {

  @Value("${external-service-url}")
  private String externalServiceUrl;

  private final ArtRepository artRepository;
  private final RestTemplate restTemplate;

  // GET: /time/{artId}
  public List<TimeStatusDto> getTimeStatus(Long artId) {
    // artId 유효성 검사
    boolean exists = artRepository.existsById(artId);
    if (!exists) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid artId");
    }
    // 벤더 서버에 시간표 요청
    String url = externalServiceUrl + "/time/" + artId;
    ResponseEntity<TimeStatusDto[]> response = restTemplate.getForEntity(url, TimeStatusDto[].class);

    // 외부 서버의 응답 반환
    if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
      return Arrays.asList(response.getBody());
    } else {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get Response");
    }
  }
  // GET: /time/{artId}/{date}
  public List<TimeStatusResponseDto> getTimeStatusByDate(Long artId, String date) {
    // artId 유효성 검사
    boolean exists = artRepository.existsById(artId);
    if (!exists) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid artId");
    }
    // 벤더 서버에 해당 일자 시간표 요청
    String url = externalServiceUrl + "/time/" + artId + "/" + date;
    ResponseEntity<TimeStatusResponseDto[]> response = restTemplate.getForEntity(url, TimeStatusResponseDto[].class);

    // 외부 서버의 응답 반환
    if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
      return Arrays.asList(response.getBody());
    } else {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get Response");
    }
  }
  // GET: /time/{timetableId}/tickets
  // timetableId가 articket 서버에서는 DB에 없어서 유효성 검증 X
  public TimeTicketTypeResponseDto getTimeTickets(int timetableId) {
    // 벤더 서버에 티켓 정보 요청
    String url = externalServiceUrl + "/time/" + timetableId + "/tickets";
    ResponseEntity<TimeTicketTypeResponseDto> response = restTemplate.getForEntity(url, TimeTicketTypeResponseDto.class);

    // 외부 서버의 응답을 그대로 반환
    if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
      return response.getBody();
    } else {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get Response");
    }
  }
  // GET: /time/{timetableId}/seats
  // timetableId가 articket 서버에서는 DB에 없어서 유효성 검증 X
  public TimeSeatResponseDto getTimeSeats(int timetableId) {
    // 벤더 서버에 좌석 정보 요청
    String url = externalServiceUrl + "/time/" + timetableId + "/seats";
    ResponseEntity<TimeSeatResponseDto> response = restTemplate.getForEntity(url, TimeSeatResponseDto.class);

    // 외부 서버의 응답을 그대로 반환
    if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
      return response.getBody();
    } else {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get Response");
    }
  }
}
