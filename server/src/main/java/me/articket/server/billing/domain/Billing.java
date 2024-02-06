package me.articket.server.billing.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.articket.server.art.domain.Art;
import me.articket.server.billing.data.BillingCateogry;
import me.articket.server.common.entity.BaseEntity;
import me.articket.server.user.domain.User;

@Entity
@Table(name = "billing")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Billing extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "art_id", nullable = false)
  private Art art;

  @Column(nullable = false)
  private String reservationId;


  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  @Setter
  private BillingCateogry status;

  @Column
  @Setter
  private LocalDateTime viewingDateTime;

  @Column
  @Setter
  private LocalDateTime reservationConfirmationDateTime;
}
