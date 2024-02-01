package me.articket.server.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import me.articket.server.common.entity.BaseEntity;

import java.time.LocalDateTime;

@Entity
@Getter
public class RefreshToken extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 500)
    private String token;

    @Column
    private Boolean isExpired;

    @Column
    private LocalDateTime expireDate;

    public boolean isValid(LocalDateTime now) {
        if (isExpired) return false;
        return expireDate.isAfter(now);
    }

    public void setExpired() {
        this.isExpired = true;
    }

    public void setUserRefreshToken(User user, String token, long tokenexpiresecond) {

        this.user = user;
        this.token = token;
        this.isExpired = false;
        this.expireDate = LocalDateTime.now().plusSeconds(tokenexpiresecond);
    }
}
