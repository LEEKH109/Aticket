package me.articket.server.billing.repository;

import java.util.List;
import java.util.Optional;
import me.articket.server.billing.data.BillingCategory;
import me.articket.server.billing.domain.Billing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillingRepository extends JpaRepository<Billing, Integer> {

  boolean existsByReservationId(String reservationId);

  Optional<Billing> findByReservationId(String reservationId);

  List<Billing> findByUserId(Long userId);

  List<Billing> findByUserIdAndStatus(Long userId, BillingCategory status);
}
