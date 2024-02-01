package me.articket.server.art.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import me.articket.server.art.domain.Art;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class ArtInfoRes {

    private Long artId;
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<String> actors;
    private Integer rate;
    private String posterUrl;
    private List<String> infoUrls;

    public static ArtInfoRes of(Art art) {
        return ArtInfoRes.builder()
                .artId(art.getId())
                .title(art.getTitle())
                .startDate(art.getStartDate())
                .endDate(art.getEndDate())
                .actors(art.getActors())
                .rate(art.getRate())
                .posterUrl(art.getPosterUrl())
                .infoUrls(art.getInfoUrls())
                .build();
    }
}
