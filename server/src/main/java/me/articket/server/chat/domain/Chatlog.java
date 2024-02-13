package me.articket.server.chat.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.articket.server.common.entity.BaseEntity;
import me.articket.server.user.domain.User;
import me.articket.server.art.data.ArtCategory;

import java.time.LocalDateTime;

@Entity
@Table(name = "chatlogs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Chatlog extends BaseEntity {

    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ArtCategory category;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime regDate;
}
