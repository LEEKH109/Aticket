package me.articket.server.common.config;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Configuration
public class JacksonConfig {

    @Bean
    public Module localDateTimeModule() {
        JavaTimeModule module = new JavaTimeModule();

        // LocalDateTime
        module.addSerializer(LocalDateTime.class, new JsonSerializer<>() {
            @Override
            public void serialize(LocalDateTime localDateTime, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
                String formattedDateTime = localDateTime.atZone(ZoneOffset.UTC).format(DateTimeFormatter.ISO_INSTANT);
                jsonGenerator.writeString(formattedDateTime);
            }
        });
        module.addDeserializer(LocalDateTime.class, new JsonDeserializer<>() {
            @Override
            public LocalDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
                String dateTimeString = jsonParser.getValueAsString();

                try {
                    Instant instant = Instant.parse(dateTimeString);
                    return LocalDateTime.ofInstant(instant, ZoneOffset.UTC);
                } catch (DateTimeParseException ex) {
                    throw new IOException("Error parsing LocalDateTime from UTC ISO string: " + dateTimeString, ex);
                }
            }
        });

        // LocalDate
        module.addSerializer(LocalDate.class, new JsonSerializer<>() {
            @Override
            public void serialize(LocalDate localDate, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
                String formattedDate = localDate.format(DateTimeFormatter.ISO_DATE);
                jsonGenerator.writeString(formattedDate);
            }
        });
        module.addDeserializer(LocalDate.class, new JsonDeserializer<>() {
            @Override
            public LocalDate deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
                String dateString = jsonParser.getValueAsString();

                try {
                    return LocalDate.parse(dateString);
                } catch (DateTimeParseException ex) {
                    throw new IOException("Error parsing LocalDate from UTC ISO string: " + dateString, ex);
                }
            }
        });

        return module;
    }
}
