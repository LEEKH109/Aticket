package me.articket.server.art.domain;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import me.articket.server.art.data.ArtCategory;
import me.articket.server.art.repository.ArtRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@Transactional
public class ArtTests {

    @Autowired
    ArtRepository artRepository;

    @Autowired
    EntityManager entityManager;

    @Test
    @Transactional
    void actorsSerializeTest() {
        Art art = new Art();
        art.setTitle("test title");
        art.getActors().add("actor1");
        art.getActors().add("actor2");
        art.getActors().add("actor3");
        art.setPosterUrl("test poster url");

        art = artRepository.save(art);
        art.getActors().clear();
        entityManager.refresh(art);

        Assertions.assertEquals(List.of("actor1", "actor2", "actor3"), art.getActors());
    }

    @Test
    void categorySerializeTest() {
        Art art = new Art();
        art.setTitle("test title 2");
        art.setPosterUrl("test poster url 2");
        art.setCategory(ArtCategory.MUSICAL);

        art = artRepository.save(art);
        art.setCategory(ArtCategory.SHOW);
        entityManager.refresh(art);

        Assertions.assertEquals(ArtCategory.MUSICAL, art.getCategory());
    }
}
