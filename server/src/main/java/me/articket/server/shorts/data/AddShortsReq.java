package me.articket.server.shorts.data;

import lombok.Data;
import me.articket.server.art.domain.Art;
import me.articket.server.shorts.domain.Shorts;

@Data
public class AddShortsReq {

    private Long artId;
    private String mediaUrl;
    private ShortsType type;

    public Shorts apply(Shorts shorts, Art art) {
        if (!art.getId().equals(artId)) {
            throw new IllegalArgumentException("Art id mismatch: req.artId=" + artId + ", art.id=" + art);
        }
        shorts.setArt(art);
        shorts.setMediaUrl(getMediaUrl());
        shorts.setType(getType());
        return shorts;
    }
}
