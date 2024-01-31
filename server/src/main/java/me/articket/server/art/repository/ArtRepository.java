package me.articket.server.art.repository;

import me.articket.server.art.domain.Art;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtRepository extends JpaRepository<Art, Long> {
}
