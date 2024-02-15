package me.articket.server.user.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.articket.server.common.entity.BaseEntity;
import me.articket.server.user.data.UserRole;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

    // 카카오 ID를 저장하는 필드
    @Column(nullable = false)
    private Long kakaoId;

    // 사용자의 실명을 저장하는 필드
    @Column(nullable = false)
    private String name;

    // 사용자 이메일을 저장하는 필드
    @Column(nullable = false)
    private String email;

    // 사용자 생년월일을 저장하는 필드
    @Column(nullable = false)
    private LocalDate birthday;

    // 사용자 닉네임을 저장하는 필드
    @Column(nullable = false)
    private String nickname;

    // 사용자 프로필 사진 URL을 저장하는 필드
    @Column(length = 2000)
    private String profileUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.ROLE_USER;

    public Collection<String> getRoles() {
        Collection<String> roles = new ArrayList<>();
        roles.add(role.getValue());
        return roles;
    }

    // 카카오에서 받아온 사용자 정보로 필드 값을 설정하는 메서드
    public boolean setKakaoUserInfo(Long kakaoId, String name, String email, LocalDate birthday, String kakaoNickname, String profileUrl) {
        this.kakaoId = kakaoId;
        this.name = name;
        this.email = email;
        this.birthday = birthday;
        this.nickname = filterKakaoNickname(kakaoNickname);
        this.profileUrl = profileUrl;
        return true;
    }

    // 카카오에서 받아온 닉네임을 필터링하여 설정하는 메서드
    public String filterKakaoNickname(String kakaoNickname) {
        if (kakaoNickname == null) {
            return createDefaultNickname();
        }

        // kakaoNickname에서 가능한 문자만 남기고 삭제
        Pattern pattern = Pattern.compile("[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\\s]+");
        Matcher matcher = pattern.matcher(kakaoNickname);
        StringBuilder sb = new StringBuilder();
        while (matcher.find()) sb.append(matcher.group());
        kakaoNickname = sb.toString();
        kakaoNickname = kakaoNickname.trim();

        // 길이가 2 미만일 경우 default nickname 만들기
        if (kakaoNickname.length() < 2) kakaoNickname = createDefaultNickname();

        // 길이가 10 초과일 경우 앞 10글자만 사용
        if (kakaoNickname.length() > 10) kakaoNickname = kakaoNickname.substring(0, 10);

        // 처리된 문자열 반환
        return kakaoNickname;

        // TODO : 이모티콘이 들어왔을때 필터링해줘야함 (나중에)

        // TODO 생각해볼 점 : error가 발생할 가능성이 없을까? 없을듯 모든 조건 처리를 하기 때문에
    }

    // 기본 닉네임을 생성하는 메서드
    private String createDefaultNickname() {
        return String.format("user%06d", (int) (Math.random() * 999999));
    }

    // 사용자가 직접 닉네임을 설정하는 메서드
    public boolean setNickname(String nickname) {
        if (nickname == null) {
            return false;
        }
        nickname = nickname.trim();
        // 닉네임의 길이와 패턴을 검사하여 설정
        if (2 <= nickname.length() && nickname.length() <= 10 && nickname.matches("[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9 ]+")) {
            this.nickname = nickname;
            return true;
        }
        return false;
    }

    // 사용자 프로필 사진 URL을 설정하는 메서드
    public boolean setProfileUrl(String profileUrl) {
        if (profileUrl == null) {
            return false;
        }
        this.profileUrl = profileUrl;
        return true;
    }

    // 사용자 프로필 사진 URL을 제거하는 메서드
    public boolean removeProfileUrl() {
        if (this.profileUrl == null) {
            return false;
        }
        this.profileUrl = null;
        return true;
    }
}
