package me.articket.vendor.art.controller;

import me.articket.vendor.art.domain.Art;
import me.articket.vendor.art.sevice.ArtService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/art")
@RequiredArgsConstructor
public class ArtController {
    private final ArtService artService;
}
