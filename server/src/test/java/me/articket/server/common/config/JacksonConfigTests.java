package me.articket.server.common.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;

@SpringBootTest
public class JacksonConfigTests {

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void serializeLocalDateTimeTest() throws JsonProcessingException {
        // given
        LocalDateTime localDateTime = LocalDateTime.of(2024, Month.DECEMBER, 25, 13, 28, 55, 123456789);

        // when
        String localDateTimeString = objectMapper.writeValueAsString(localDateTime);

        // then
        Assertions.assertEquals("\"2024-12-25T13:28:55.123456789Z\"", localDateTimeString);
    }

    @Test
    void deserializeLocalDateTimeTest() throws JsonProcessingException {
        // given
        String localDateTimeString = "\"2024-12-25T13:28:55.123456789Z\"";

        // when
        LocalDateTime localDateTime = objectMapper.readValue(localDateTimeString, LocalDateTime.class);

        // then
        LocalDateTime expected = LocalDateTime.of(2024, Month.DECEMBER, 25, 13, 28, 55, 123456789);
        Assertions.assertEquals(expected, localDateTime);
    }

    @Test
    void serializeLocalDateTest() throws JsonProcessingException {
        // given
        LocalDate localDate = LocalDate.of(2024, Month.DECEMBER, 25);

        // when
        String localDateString = objectMapper.writeValueAsString(localDate);

        // then
        Assertions.assertEquals("\"2024-12-25\"", localDateString);
    }

    @Test
    void deserializeLocalDateTest() throws JsonProcessingException {
        // given
        String localDateString = "\"2024-12-25\"";

        // when
        LocalDate localDate = objectMapper.readValue(localDateString, LocalDate.class);

        // then
        LocalDate expected = LocalDate.of(2024, Month.DECEMBER, 25);
        Assertions.assertEquals(expected, localDate);
    }
}
