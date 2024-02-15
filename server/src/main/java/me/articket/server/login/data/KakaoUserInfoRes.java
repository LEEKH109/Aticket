package me.articket.server.login.data;

import lombok.Data;

@Data
public class KakaoUserInfoRes {

    private Long id;
    private KakaoAccount kakao_account;

    @Data
    static public class KakaoAccount {

        private String name;
        private String email;
        private Profile profile;
        private String birthyear;
        private String birthday;

        @Data
        static public class Profile {

            private String nickname;
            private String profile_image_url;
        }
    }

}
