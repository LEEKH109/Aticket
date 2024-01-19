package me.articket.server.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.articket.server.common.entity.BaseEntity;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

    @Column(nullable = false)
    private String kakaoId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private LocalDateTime birthday;

    @Column(nullable = false)
    private String nickname;

    @Column
    private String profileUrl;

    public boolean setKakaoUserInfo(String kakaoId, String name, String email, LocalDateTime birthday, String kakaoNickname) {
        this.kakaoId = kakaoId;
        this.name = name;
        this.email = email;
        this.birthday = birthday;
        this.nickname = filterKakaoNickname(kakaoNickname);
        return true;
    }

    private String filterKakaoNickname(String kakaoNickname) {
        if (kakaoNickname == null) {
            return createDefaultNickname();
        }
        kakaoNickname = kakaoNickname.trim();
        // TODO: kakaoNickname에서 가능한 문자만 남기고 삭제
        // TODO: 길이가 2 미만일 경우 default nickname 리턴
        // TODO: 길이가 10 초과일 경우 앞 10글자만 사용
        // TODO: 모두 만족하면 처리된 문자열 반환
        // TODO: 테스트 작성
        throw new RuntimeException("Not implemented!");
    }

    private String createDefaultNickname() {
        return String.format("user%06d", (int) (Math.random() * 999999));
    }

    public boolean setNickname(String nickname) {
        if (nickname == null) {
            return false;
        }
        nickname = nickname.trim();
        if (2 <= nickname.length() && nickname.length() <= 10 && nickname.matches("[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9 ]+")) {
            this.nickname = nickname;
            return true;
        }
        return false;
    }

    public boolean setProfileUrl(String profileUrl) {
        if (profileUrl == null) {
            return false;
        }
        this.profileUrl = profileUrl;
        return true;
    }

    public boolean removeProfileUrl() {
        if (this.profileUrl == null) {
            return false;
        }
        this.profileUrl = null;
        return true;
    }
}
