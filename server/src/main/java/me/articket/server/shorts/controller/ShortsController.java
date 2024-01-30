package me.articket.server.shorts.controller;

import lombok.RequiredArgsConstructor;
import me.articket.server.common.response.SuccessResponse;
import me.articket.server.shorts.data.AddShortsReq;
import me.articket.server.shorts.data.ModifyShortsReq;
import me.articket.server.shorts.data.ShortsInfoRes;
import me.articket.server.shorts.service.ShortsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shorts")
@RequiredArgsConstructor
public class ShortsController {

    private final ShortsService shortsService;

    @GetMapping("/{id}")
    public SuccessResponse<ShortsInfoRes> getShortsInfo(@PathVariable Long id) {
        return new SuccessResponse<>(shortsService.getShortsInfo(id));
    }

    @PostMapping("/add")
    public SuccessResponse<ShortsInfoRes> addShorts(@RequestBody AddShortsReq req) {
        return new SuccessResponse<>(shortsService.addShorts(req));
    }

    @PutMapping("/{id}")
    public SuccessResponse<ShortsInfoRes> modifyShortsInfo(@PathVariable Long id, @RequestBody ModifyShortsReq req) {
        return new SuccessResponse<>(shortsService.modifyShortsInfo(id, req));
    }
}
