package me.articket.server.shorts.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.articket.server.art.domain.Art;
import me.articket.server.common.entity.BaseEntity;
import me.articket.server.shorts.data.ShortsType;
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
    private Shorts shorts;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Long viewDetail;

    @Column(nullable = false)
    private Long viewTime;

}
