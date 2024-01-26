package me.articket.server.user.domain;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class UserTests {

    @Test
    public void filterNickname() {
        User user = new User();

        Assertions.assertEquals("32 41", user.filterKakaoNickname("  !32 41   ")); // 앞뒤, 공백, 특수문자 확인

        Assertions.assertEquals("하 좌 야", user.filterKakaoNickname("   하 좌 야           ")); // 앞뒤, 한글 체크

        Assertions.assertEquals("ㅁㅁㅁㅁ", user.filterKakaoNickname("ㅁㅁㅁㅁ")); // 한글 자음체크

        Assertions.assertEquals("ㅏㅗㅜㅢ ㅟㅙㅘ", user.filterKakaoNickname("ㅏㅗㅜㅢ ㅟㅙㅘ")); //한글 모음체크

        Assertions.assertEquals("user", user.filterKakaoNickname("  !   !  ").substring(0, 4)); // 특수문자 지운 후 남은공백 체크

        Assertions.assertEquals("진 짜ㅋㅋ", user.filterKakaoNickname(" 馬 진 짜ㅋㅋ 五 ")); //한자 체크

        Assertions.assertEquals("umbrella", user.filterKakaoNickname("    |!umbrella!|      ")); //영어 특수문자 체크

        Assertions.assertEquals("user", user.filterKakaoNickname("           ").substring(0, 4)); //2글자 미만시 기본 닉네임 체크

        Assertions.assertEquals("강1s지2d헌3a짱", user.filterKakaoNickname("강1s지2d헌3a짱4f")); //10글자 이상시 앞의 10글자만 자르기 체크
    }

    @Test
    public void setNicknameTrim() {
        User user = new User();
        String defaultNickname = user.getNickname();

        Assertions.assertFalse(user.setNickname("     ")); // 5
        Assertions.assertEquals(defaultNickname, user.getNickname());
        Assertions.assertFalse(user.setNickname("           ")); // 11
        Assertions.assertEquals(defaultNickname, user.getNickname());

        Assertions.assertTrue(user.setNickname("               Hello                  "));
        Assertions.assertEquals("Hello", user.getNickname());
    }

    @Test
    public void setNicknameShort() {
        User user = new User();
        String defaultNickname = user.getNickname();

        Assertions.assertFalse(user.setNickname("     "));
        Assertions.assertEquals(defaultNickname, user.getNickname());
        Assertions.assertFalse(user.setNickname("O"));
        Assertions.assertEquals(defaultNickname, user.getNickname());
        Assertions.assertFalse(user.setNickname("  O  "));
        Assertions.assertEquals(defaultNickname, user.getNickname());

        Assertions.assertTrue(user.setNickname("OO"));
        Assertions.assertEquals("OO", user.getNickname());
        Assertions.assertTrue(user.setNickname("  OO  "));
        Assertions.assertEquals("OO", user.getNickname());
        Assertions.assertTrue(user.setNickname("O O"));
        Assertions.assertEquals("O O", user.getNickname());
    }

    @Test
    public void setNicknameLong() {
        User user = new User();
        String defaultNickname = user.getNickname();

        Assertions.assertFalse(user.setNickname("12345 67890"));
        Assertions.assertEquals(defaultNickname, user.getNickname());
        Assertions.assertFalse(user.setNickname("12345678901"));
        Assertions.assertEquals(defaultNickname, user.getNickname());
        Assertions.assertFalse(user.setNickname("   12345678901    "));
        Assertions.assertEquals(defaultNickname, user.getNickname());
        Assertions.assertFalse(user.setNickname("안녕하세요반갑습니01"));
        Assertions.assertEquals(defaultNickname, user.getNickname());

        Assertions.assertTrue(user.setNickname("   1234567890    "));
        Assertions.assertEquals("1234567890", user.getNickname());
        Assertions.assertTrue(user.setNickname("   123 456789    "));
        Assertions.assertEquals("123 456789", user.getNickname());
        Assertions.assertTrue(user.setNickname("안녕하세요반갑습니다"));
        Assertions.assertEquals("안녕하세요반갑습니다", user.getNickname());
        Assertions.assertTrue(user.setNickname("안녕하세요반갑습니1"));
        Assertions.assertEquals("안녕하세요반갑습니1", user.getNickname());
    }

    @Test
    public void setNicknameInvalidChar() {
        User user = new User();
        String defaultNickname = user.getNickname();

        Assertions.assertFalse(user.setNickname("안녕하세요!"));
        Assertions.assertEquals(defaultNickname, user.getNickname());
        Assertions.assertFalse(user.setNickname("Hello~"));
        Assertions.assertEquals(defaultNickname, user.getNickname());
        Assertions.assertFalse(user.setNickname("@#$@#$@#$"));
        Assertions.assertEquals(defaultNickname, user.getNickname());

        Assertions.assertTrue(user.setNickname("안 녕 하 세 요"));
        Assertions.assertEquals("안 녕 하 세 요", user.getNickname());
        Assertions.assertTrue(user.setNickname("ㅎㅎㅎㅎㅎ"));
        Assertions.assertEquals("ㅎㅎㅎㅎㅎ", user.getNickname());
        Assertions.assertTrue(user.setNickname("abcEㅣㅢㅡ095"));
        Assertions.assertEquals("abcEㅣㅢㅡ095", user.getNickname());
    }
}
