package me.articket.server.art.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.art.data.ArtInfoRes;
import me.articket.server.art.service.ArtService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/art")
@RequiredArgsConstructor
public class ArtController {

    private final ArtService artService;

    @GetMapping("/{id}")
    public ArtInfoRes getArtInfo(@PathVariable Long id) {
        return artService.getArtInfo(id);
    }
}
