package me.articket.server.art.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.art.data.AddArtReq;
import me.articket.server.art.data.ArtInfoRes;
import me.articket.server.art.data.ModifyArtReq;
import me.articket.server.art.service.ArtService;
import me.articket.server.common.response.SuccessResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/art")
@RequiredArgsConstructor
public class ArtController {

    private final ArtService artService;

    @GetMapping("/{id}")
    public SuccessResponse<ArtInfoRes> getArtInfo(@PathVariable Long id) {
        return new SuccessResponse<>(artService.getArtInfo(id));
    }

    @PostMapping("/add")
    public SuccessResponse<ArtInfoRes> addArt(@RequestBody AddArtReq req) {
        return new SuccessResponse<>(artService.addArt(req));
    }

    @PutMapping("/{id}")
    public SuccessResponse<ArtInfoRes> modifyArtInfo(@PathVariable Long id, @RequestBody ModifyArtReq req) {
        return new SuccessResponse<>(artService.modifyArt(id, req));
    }
}
