package me.articket.server.common.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.extern.slf4j.Slf4j;
import me.articket.server.common.exception.CustomException;
import me.articket.server.common.exception.ErrorCode;
import me.articket.server.login.data.OauthTokenRes;
import me.articket.server.login.data.UserDetail;
import me.articket.server.login.data.UserDetailAuthenticationToken;
import me.articket.server.user.domain.User;
import me.articket.server.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

import static java.time.LocalDateTime.now;

@Slf4j
@Component
public class TokenProvider {
    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "bearer";
    private static final int ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; // 30분
    private static final int REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7; // 7일
    private static final String ISS = "http://kauth.kakao.com";
    private static final String AUD = "https://i10a704.p.ssafy.io/";
    private final Key key;

    @Autowired
    private UserRepository userRepository;

    // application.yml에서 주입받은 secret 값을 base64 decode하여 key 변수에 할당
    public TokenProvider(@Value("${spring.security.oauth2.jwt.secret}") String secret) {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // Authentication 객체에 포함되어 있는 권한 정보들을 담은 토큰을 생성
    public OauthTokenRes generateTokenDto(User user) {
        long now = (new Date()).getTime();

        //Access Token
        String accessToken = Jwts.builder()
                .claim(AUTHORITIES_KEY, user.getRoles())
                .signWith(key, SignatureAlgorithm.HS512)
                .setIssuer(ISS)
                .setAudience(AUD)
                .setSubject(String.valueOf(user.getId()))
                .setIssuedAt(Timestamp.valueOf(now()))
                .setExpiration(new Date(now + ACCESS_TOKEN_EXPIRE_TIME))
                .compact();

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS512)
                .setIssuer(ISS)
                .setAudience(AUD)
                .setSubject(String.valueOf(user.getId()))
                .setIssuedAt(Timestamp.valueOf(now()))
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
                .compact();

        return OauthTokenRes.builder()
                .userId(user.getId())
                .accessToken(accessToken)
                .tokenType(BEARER_TYPE)
                .expiresIn(ACCESS_TOKEN_EXPIRE_TIME - 1)
                .refreshToken(refreshToken)
                .refreshTokenExpiresIn(REFRESH_TOKEN_EXPIRE_TIME)
                .build();
    }

    // Access 토큰을 복호화하여 검증 후 값 가져오기
    public UserDetailAuthenticationToken getAuthentication(String accessToken) {

        // 토큰 복호화 : JWT의 body
        Claims claims = parseClaims(accessToken);

        if (claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
                ((Collection<String>) claims.get(AUTHORITIES_KEY)).stream()
                        .map(SimpleGrantedAuthority::new)
                        .toList();
        Long userId = Long.valueOf(claims.getSubject());

        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElseThrow(); // 액세스 토큰 ID에 해당하는 유저가 없을 경우 오류

        UserDetail userDetail = new UserDetail();
        userDetail.setId(userId);
        userDetail.setNickname(user.getNickname());
        userDetail.setProfileUrl(user.getProfileUrl());

        return new UserDetailAuthenticationToken(userDetail, authorities);

    }

    // 검증이 끝난 Refresh Token을 복호화하여 값 가져오기
    public UserDetail getUserDetailbyRefreshToken(String refreshToken) {

        Claims claims = parseClaims(refreshToken);
        Long userId = Long.valueOf(claims.getSubject());

        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElseThrow(); // 액세스 토큰 ID에 해당하는 유저가 없을 경우 오류

        UserDetail userDetail = new UserDetail();
        userDetail.setId(userId);
        userDetail.setNickname(user.getNickname());
        userDetail.setProfileUrl(user.getProfileUrl());

        return userDetail;
    }

    // 토큰을 검증하는 역할
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            throw new CustomException(ErrorCode.ACCESS_TOKEN_EXPIRE_ERROR);
        } catch (SecurityException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            throw new CustomException(ErrorCode.ACCESS_TOKEN_ERROR);
        }
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
