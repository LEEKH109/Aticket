const kakaoURL = import.meta.env.VITE_KAKAO_URL;
const redirectURI = import.meta.env.VITE_REDIRECT_URI;
const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoURL}&redirect_uri=http://i10a704.p.ssafy.io${redirectURI}&response_type=code`;
export default kakaoAuthURL;
