package me.articket.server.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    KAKAO_AUTHORIZATION_CODE_ERROR(403, "DDE001", "잘못된 code입니다."),

    USER_NOT_FOUND_ERROR(404, "USR001", "존재하지 않는 사용자입니다."),

    ART_NOT_FOUND_ERROR(404, "ART001", "존재하지 않는 공연입니다."),
    ;

    private final int status;

    private final String code;

    private final String message;
}
