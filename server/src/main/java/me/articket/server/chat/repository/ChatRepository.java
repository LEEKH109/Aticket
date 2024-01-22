package me.articket.server.chat.repository;

import me.articket.server.chat.domain.Chatlog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chatlog, Long> {
}
