package me.articket.server.like.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class LikeStateRes {

    private Boolean like;

    public static LikeStateRes of(boolean state) {
        return LikeStateRes.builder()
                .like(state)
                .build();
    }
}
