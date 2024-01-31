package me.articket.server.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    KAKAO_AUTHORIZATION_CODE_ERROR(403, "DDE001", "잘못된 code입니다."),

    USER_NOT_FOUND_ERROR(404, "USR001", "존재하지 않는 사용자입니다."),

    ACCESS_TOKEN_EXPIRE_ERROR(401, "REF001", "Refresh Token의 기간이 만료되었습니다."),

    ACCESS_TOKEN_ERROR(401, "REF002", "Refresh Token이 잘못되었습니다."),

    REFRESH_TOKEN_VALIDATION_ERROR(401, "REF001", "Refresh Token이 잘못되었습니다."),
    ;

    private final int status;

    private final String code;

    private final String message;
}
