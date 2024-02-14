package me.articket.server.shorts.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import me.articket.server.shorts.domain.Shorts;

@Data
@AllArgsConstructor
@Builder
public class ShortsInfoRes {

    private Long shortsId;
    private Long artId;
    private String type;
    private String mediaUrl;

    public static ShortsInfoRes of(Shorts shorts) {
        return ShortsInfoRes.builder()
                .shortsId(shorts.getId())
                .artId(shorts.getArt().getId())
                .type(shorts.getType().name())
                .mediaUrl(shorts.getMediaUrl())
                .build();
    }
}
