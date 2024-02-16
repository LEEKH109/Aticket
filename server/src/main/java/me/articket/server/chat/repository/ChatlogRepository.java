package me.articket.server.chat.repository;

import me.articket.server.art.data.ArtCategory;
import me.articket.server.chat.domain.Chatlog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatlogRepository extends JpaRepository<Chatlog, Long> {
    List<Chatlog> findByCategoryOrderByRegDateDesc(ArtCategory category);
    Page<Chatlog> findByCategoryOrderByRegDateDesc (ArtCategory category, Pageable pageable);
}
