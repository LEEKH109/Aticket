package me.articket.server.shorts.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.shorts.data.ShortsInfoRes;
import me.articket.server.shorts.service.ShortsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shorts")
@RequiredArgsConstructor
public class ShortsController {

    private final ShortsService shortsService;

    @GetMapping("/{id}")
    public ShortsInfoRes getShortsInfo(@PathVariable Long id) {
        return shortsService.getShortsInfo(id);
    }
}
