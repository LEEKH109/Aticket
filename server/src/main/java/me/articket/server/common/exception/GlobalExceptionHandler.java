package me.articket.server.common.exception;

import lombok.extern.slf4j.Slf4j;
import me.articket.server.common.response.ErrorResponse;
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

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<FailResponse<Map<String, String>>> handle(CustomException ex) {
        ErrorCode errorCode = ex.getErrorCode();
        Map<String, String> data = new TreeMap<>();
        data.put("code", errorCode.getCode());
        data.put("message", errorCode.getMessage());
        return new ResponseEntity<>(new FailResponse<>(data), HttpStatusCode.valueOf(errorCode.getStatus()));
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<FailResponse<Map<String, String>>> handle(MissingServletRequestParameterException ex) {
        Map<String, String> data = new TreeMap<>();
        data.put("code", "PAR001");
        data.put("message", "Param 형식 잘못됨");
        return new ResponseEntity<>(new FailResponse<>(data), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handle(Exception ex) {
        return new ResponseEntity<>(new ErrorResponse("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
