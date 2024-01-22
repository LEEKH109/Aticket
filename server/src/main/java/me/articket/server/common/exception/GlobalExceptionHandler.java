package me.articket.server.common.exception;

import lombok.extern.slf4j.Slf4j;
import me.articket.server.common.response.FailResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.TreeMap;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // CustomException이 발생했을 때 처리하는 메서드
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<FailResponse<Map<String, String>>> handle(CustomException ex) {
        // CustomException에서 ErrorCode를 가져옴
        ErrorCode errorCode = ex.getErrorCode();

        // 응답 데이터를 담을 TreeMap 객체 생성
        Map<String, String> data = new TreeMap<>();
        // 에러 코드와 메시지를 데이터에 추가
        data.put("code", errorCode.getCode());
        data.put("message", errorCode.getMessage());

        // FailResponse 객체를 생성하여 ResponseEntity로 반환
        return new ResponseEntity<>(new FailResponse<>(data), HttpStatusCode.valueOf(errorCode.getStatus()));
    }

    // MissingServletRequestParameterException이 발생했을 때 처리하는 메서드
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<FailResponse<Map<String, String>>> handle(MissingServletRequestParameterException ex) {
        // 응답 데이터를 담을 TreeMap 객체 생성
        Map<String, String> data = new TreeMap<>();
        // 기본적인 파라미터 오류 코드와 메시지를 데이터에 추가
        data.put("code", "PAR001");
        data.put("message", "Param 형식 잘못됨");

        // FailResponse 객체를 생성하여 ResponseEntity로 반환 (HTTP 상태 코드는 BAD_REQUEST)
        return new ResponseEntity<>(new FailResponse<>(data), HttpStatus.BAD_REQUEST);
    }
}
