package me.articket.server.art.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.art.data.AddArtReq;
import me.articket.server.art.data.ArtInfoRes;
import me.articket.server.art.service.ArtService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/art")
@RequiredArgsConstructor
public class ArtController {

    private final ArtService artService;

    @GetMapping("/{id}")
    public ArtInfoRes getArtInfo(@PathVariable Long id) {
        return artService.getArtInfo(id);
    }

    @PutMapping("/add")
    public ArtInfoRes addArt(@RequestBody AddArtReq req) {
        return artService.addArt(req);
    }
}
