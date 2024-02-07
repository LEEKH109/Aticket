package me.articket.server.shorts.repository;

import me.articket.server.art.data.ArtCategory;
import me.articket.server.shorts.domain.Shorts;
import me.articket.server.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShortsRepository extends JpaRepository<Shorts, Long> {

    @Query("""
            SELECT s
              FROM Shorts s
             WHERE s IN
                   (SELECT l.shorts
                      FROM Like l
                     WHERE l.state = true
                       AND l.id IN
                           (SELECT MAX(l2.id)
                              FROM Like l2
                             WHERE l2.user = :user
                             GROUP BY l2.user, l2.shorts))""")
    List<Shorts> findByUserAndLikeStateIsTrue(User user);

    List<Shorts> findAllByArt_Category(ArtCategory category);
}
