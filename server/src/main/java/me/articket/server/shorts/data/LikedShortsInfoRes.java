package me.articket.server.shorts.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import me.articket.server.shorts.domain.Shorts;

@Data
@AllArgsConstructor
@Builder
public class LikedShortsInfoRes {

    private Long shortsId;
    private ShortsType type;
    private String mediaUrl;

    public static LikedShortsInfoRes of(Shorts shorts) {
        return LikedShortsInfoRes.builder()
                .shortsId(shorts.getId())
                .type(shorts.getType())
                .mediaUrl(shorts.getMediaUrl())
                .build();
    }
}
