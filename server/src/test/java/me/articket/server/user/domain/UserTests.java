package me.articket.server.user.domain;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class UserTests {

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
