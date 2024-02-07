package me.articket.server.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    KAKAO_AUTHORIZATION_CODE_ERROR(403, "DDE001", "잘못된 code입니다."),

    USER_NOT_FOUND_ERROR(404, "USR001", "존재하지 않는 사용자입니다."),

    USER_NICKNAME_WRONG_ERROR(401, "USER002", "닉네임의 형식이 잘못되었습니다."),

    ACCESS_TOKEN_EXPIRE_ERROR(401, "ACC001", "Access Token의 기간이 만료되었습니다."),

    ACCESS_TOKEN_ERROR(401, "ACC002", "Access Token이 잘못되었습니다."),

    REFRESH_TOKEN_VALIDATION_ERROR(401, "REF001", "Refresh Token이 잘못되었습니다."),

    ART_NOT_FOUND_ERROR(404, "ART001", "존재하지 않는 공연입니다."),

    SHORTS_NOT_FOUND_ERROR(404, "SHR001", "존재하지 않는 숏폼입니다."),

    INVALID_LIKE_REQUEST_ERROR(409, "LIK001", "현재 좋아요 상태가 변경하려는 상태와 동일합니다."),

    CHATLOG_NOT_FOUND( 404, "CHT001", "채팅이 없습니다."),

    FILE_UPLOAD_ERROR(404, "UPL001", "파일 업로드 에러");

    private final int status;

    private final String code;

    private final String message;
}
