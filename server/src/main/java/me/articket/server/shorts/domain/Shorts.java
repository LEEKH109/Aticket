package me.articket.server.shorts.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.articket.server.art.domain.Art;
import me.articket.server.common.entity.BaseEntity;
import me.articket.server.shorts.data.ShortsType;
import org.apache.logging.log4j.util.Strings;

@Entity
@Table(name = "shorts")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Shorts extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "art_id", nullable = false)
    @Setter
    private Art art;

    @Column(nullable = false, length = 2000)
    private String mediaUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Setter
    private ShortsType type;

    public boolean setMediaUrl(String mediaUrl) {
        if (Strings.isBlank(mediaUrl)) {
            return false;
        }
        this.mediaUrl = mediaUrl;
        return true;
    }
}
