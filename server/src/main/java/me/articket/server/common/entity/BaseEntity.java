package me.articket.server.common.entity;

import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

    // 엔티티의 기본 키를 나타내는 어노테이션
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    // 엔티티가 생성된 일시를 나타내는 어노테이션
    @CreatedDate
    protected LocalDateTime createdDate;

    // 엔티티가 마지막으로 수정된 일시를 나타내는 어노테이션
    @LastModifiedDate
    protected LocalDateTime lastModifiedDate;
}
