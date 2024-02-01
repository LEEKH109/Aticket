package me.articket.server.common.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

public class StringListStringConverterTests {

    @Test
    void toDatabaseColumnSuccess() {
        StringListStringConverter converter = new StringListStringConverter();
        List<String> list = List.of("hello", "world", "asdf", "welcome");
        String s = converter.convertToDatabaseColumn(list);
        Assertions.assertEquals("hello,world,asdf,welcome", s);
    }

    @Test
    void toDatabaseColumnThrow() {
        StringListStringConverter converter = new StringListStringConverter();
        List<String> list = List.of("hello", ",");
        Assertions.assertThrows(RuntimeException.class, () -> converter.convertToDatabaseColumn(list));
    }

    @Test
    void toDatabaseColumnNull() {
        StringListStringConverter converter = new StringListStringConverter();
        Assertions.assertNull(converter.convertToDatabaseColumn(null));
    }

    @Test
    void toAttributeSuccess() {
        StringListStringConverter converter = new StringListStringConverter();
        String s = "hello,world,asdf";
        List<String> strings = converter.convertToEntityAttribute(s);
        Assertions.assertEquals(List.of("hello", "world", "asdf"), strings);
    }

    @Test
    void toAttributeNull() {
        StringListStringConverter converter = new StringListStringConverter();
        Assertions.assertNull(converter.convertToEntityAttribute(null));
    }
}
