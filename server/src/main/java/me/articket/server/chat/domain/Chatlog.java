package me.articket.server.chat.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.articket.server.common.entity.BaseEntity;
import me.articket.server.user.domain.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "chatlog")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Chatlog extends BaseEntity {

    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @Column(nullable = false)
    private int categoryId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime regDate;
}
