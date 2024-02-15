package me.articket.server.shorts.domain;

import jakarta.persistence.*;
import lombok.*;
import me.articket.server.common.entity.BaseEntity;
import me.articket.server.user.domain.User;
import org.apache.logging.log4j.util.Strings;

@Entity
@Table(name = "viewlog")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Viewlog extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "short_id", nullable = false)
    @Setter
    private Shorts shorts;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    @Setter
    private Integer viewDetail;

    @Column(nullable = false)
    @Setter
    private float viewTime;


    @Builder
    public Viewlog(Long id, Shorts shorts, User user, Integer viewDetail, float viewTime) {
        this.id = id;
        this.shorts = shorts;
        this.user = user;
        this.viewDetail = viewDetail;
        this.viewTime = viewTime;
    }

}
