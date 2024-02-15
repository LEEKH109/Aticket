package me.articket.server.shorts.repository;

import me.articket.server.shorts.domain.Viewlog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewlogRepository extends JpaRepository<Viewlog, Long> {

}
