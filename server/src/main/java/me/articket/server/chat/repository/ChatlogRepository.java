package me.articket.server.chat.repository;

import me.articket.server.chat.domain.Chatlog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatlogRepository extends JpaRepository<Chatlog, Long> {
    Optional<Chatlog> findTopByCategoryIdOrderByCreatedDateDesc(int categoryId);
    List<Chatlog> findTop5ByCategoryIdOrderByCreatedDateDesc(int categoryId);
    List<Chatlog> findTop10ByCategoryIdOrderByCreatedDateDesc(int categoryId);
    Page<Chatlog> findByCategoryIdOrderByCreatedDateDesc(int categoryId, Pageable pageable);

}
