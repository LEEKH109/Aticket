package me.articket.server.common.util;

import jakarta.persistence.AttributeConverter;
import org.apache.logging.log4j.util.Strings;

import java.util.List;

public class StringListStringConverter implements AttributeConverter<List<String>, String> {

    @Override
    public String convertToDatabaseColumn(List<String> strings) {
        if (strings == null) return null;
        if (strings.stream().anyMatch(str -> str.contains(","))) {
            throw new RuntimeException("Attribute contains ','.");
        }
        return Strings.join(strings, ',');
    }

    @Override
    public List<String> convertToEntityAttribute(String s) {
        if (s == null) return null;
        return List.of(s.split(","));
    }
}
