package me.articket.server.chat.repository;

import me.articket.server.chat.domain.Chatlog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatlogRepository extends JpaRepository<Chatlog, Long> {
    Optional<Chatlog> findTopByCategoryIdOrderByRegDateDesc(int categoryId);
    Page<Chatlog> findByCategoryIdOrderByRegDateDesc(int categoryId, Pageable pageable);
}
