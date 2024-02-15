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
    private ArtCategory category;
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String location;
    private List<String> actors;
    private Integer rate;
    private String posterUrl;
    private List<String> infoUrls;

    public static ArtInfoRes of(Art art) {
        return ArtInfoRes.builder()
                .artId(art.getId())
                .category(art.getCategory())
                .title(art.getTitle())
                .startDate(art.getStartDate())
                .endDate(art.getEndDate())
                .location(art.getLocation())
                .actors(art.getActors())
                .location(art.getLocation())
                .rate(art.getRate())
                .posterUrl(art.getPosterUrl())
                .infoUrls(art.getInfoUrls())
                .category(art.getCategory())
                .build();
    }
}
