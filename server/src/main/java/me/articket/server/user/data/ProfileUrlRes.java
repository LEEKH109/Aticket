package me.articket.server.user.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class ProfileUrlRes {

    private Long userId;

    private String profileUrl;

}
