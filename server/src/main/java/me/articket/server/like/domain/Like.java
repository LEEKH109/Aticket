package me.articket.server.like.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.articket.server.common.entity.BaseEntity;
import me.articket.server.shorts.domain.Shorts;
import me.articket.server.user.domain.User;

@Entity
@Table(name = "likes")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Like extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "shorts_id", nullable = false)
    private Shorts shorts;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Boolean state;
}
