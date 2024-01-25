package me.articket.server.art.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.articket.server.art.data.ArtCategory;
import me.articket.server.common.entity.BaseEntity;
import me.articket.server.common.util.StringListStringConverter;
import org.apache.logging.log4j.util.Strings;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "arts")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Art extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column
    @Setter
    private ArtCategory category;

    @Column(nullable = false)
    private String title;

    @Column
    @Setter
    private LocalDateTime startDate;

    @Column
    @Setter
    private LocalDateTime endDate;

    @Convert(converter = StringListStringConverter.class)
    @Column
    private List<String> actors = new ArrayList<>();

    @Column
    @Setter
    private Integer rate;

    @Column(nullable = false)
    private String posterUrl;

    @Convert(converter = StringListStringConverter.class)
    @Column
    private List<String> infoUrls = new ArrayList<>();

    public boolean setTitle(String title) {
        if (Strings.isBlank(title)) {
            return false;
        }
        this.title = title;
        return true;
    }

    public boolean setPosterUrl(String posterUrl) {
        if (Strings.isBlank(posterUrl)) {
            return false;
        }
        this.posterUrl = posterUrl;
        return true;
    }

    public boolean removePosterUrl() {
        if (this.posterUrl == null) {
            return false;
        }
        this.posterUrl = null;
        return true;
    }
}
