package me.articket.server.shorts.data;

import lombok.Data;
import me.articket.server.shorts.domain.Shorts;

@Data
public class ModifyShortsReq {

    private String mediaUrl;
    private ShortsType type;

    public Shorts apply(Shorts shorts) {
        shorts.setMediaUrl(getMediaUrl());
        shorts.setType(getType());
        return shorts;
    }
}
