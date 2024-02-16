package me.articket.server.shorts.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import me.articket.server.shorts.domain.Shorts;

@Data
@AllArgsConstructor
@Builder
public class RecommendedShortsInfoRes {

    private Long shortsId;
    private ShortsType type;
    private String mediaUrl;

    public static RecommendedShortsInfoRes of(Shorts shorts) {
        return RecommendedShortsInfoRes.builder()
                .shortsId(shorts.getId())
                .type(shorts.getType())
                .mediaUrl(shorts.getMediaUrl())
                .build();
    }
}
