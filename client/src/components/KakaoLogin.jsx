
const KakaoLogin = () => {
    const key = '여기에 key를 넣어야돼용';
    const uri = '여기에 redirect uri을 넣어야돼용';
    const kakaoURL = '여기에 kakao url을 넣어야돼용';
    const loginStart = () => {
        console.log("login start");
        // window.location.href = kakaoURL;
    }
    return (
        <>
        <img
          src="/img/kakao_login_medium_wide.png"
          className="m-auto block cursor-pointer"
          onClick={loginStart}
          style={{"WebkitUserDrag":"none"}}
        ></img>
        </>
    )
    /*
        https://su-vin25.tistory.com/entry/React-SpringBoot-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84-REST-API
        이제 인가코드를 백엔드로 전달하면 됩니다.
        백엔드에서 처리하는 과정을 간단하게 설명하면 백엔드에서 이 인가코드로 액세스토큰을 발급받아
        그 액세스토큰으로 유저정보를 조회해서 DB에 저장한 후
        백엔드에서 jwt 토큰을 프론트로 전달하면 로그인 과정은 끝납니다.
    */
}

export default KakaoLogin;