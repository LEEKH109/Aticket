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

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // CustomException이 발생했을 때 처리하는 메서드
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<FailResponse<Map<String, String>>> handle(CustomException ex) {
        ErrorCode errorCode = ex.getErrorCode();

        return new ResponseEntity<>(
                FailResponse.of(errorCode.getCode(), errorCode.getMessage()),
                HttpStatusCode.valueOf(errorCode.getStatus()));
    }

    // MissingServletRequestParameterException이 발생했을 때 처리하는 메서드
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<FailResponse<Map<String, String>>> handle(MissingServletRequestParameterException ex) {
        return new ResponseEntity<>(
                FailResponse.of("PAR001", "Param 형식 잘못됨"),
                HttpStatus.BAD_REQUEST);
    }
}
