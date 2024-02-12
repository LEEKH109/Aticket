package me.articket.server.shorts.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import me.articket.server.shorts.domain.Shorts;
import me.articket.server.shorts.domain.Viewlog;

@Data
@AllArgsConstructor
@Builder
public class ViewlogRes {

    private Long viewlogId;
    private Long shortId;
    private Integer viewDetail;
    private float viewTime;

    public static ViewlogRes of(Viewlog viewlog) {
        return ViewlogRes.builder()
                .viewlogId(viewlog.getId())
                .shortId(viewlog.getShorts().getId())
                .viewDetail(viewlog.getViewDetail())
                .viewTime(viewlog.getViewTime())
                .build();
    }
}
