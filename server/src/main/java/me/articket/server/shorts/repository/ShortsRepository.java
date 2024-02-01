package me.articket.server.shorts.repository;

import me.articket.server.shorts.domain.Shorts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShortsRepository extends JpaRepository<Shorts, Long> {
}
