package me.articket.server.chat.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.articket.server.art.data.ArtCategory;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatlogDTO {
    private Long userId;
    private ArtCategory category;
    private String content;
    private LocalDateTime regDate;
}
