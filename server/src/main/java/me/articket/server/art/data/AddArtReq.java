package me.articket.server.art.data;

import lombok.Data;
import me.articket.server.art.domain.Art;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AddArtReq {

    private Integer venderArtId;
    private ArtCategory category;
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String location;
    private List<String> actors;
    private Integer rate;
    private String posterUrl;
    private List<String> infoUrls;

    public Art apply(Art art) {
        art.setVendorArtId(getVenderArtId());
        art.setCategory(getCategory());
        art.setTitle(getTitle());
        art.setStartDate(getStartDate());
        art.setEndDate(getEndDate());
        art.setLocation(getLocation());
        art.getActors().clear();
        art.getActors().addAll(getActors());
        art.setRate(getRate());
        art.setPosterUrl(getPosterUrl());
        art.getInfoUrls().clear();
        art.getInfoUrls().addAll(getInfoUrls());
        return art;
    }
}
