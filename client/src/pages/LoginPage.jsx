import KakaoOAuth from "../components/OAuth";
const MyPage = () => {
  const testRedirectURI = "/login/oauth2/code/kakao";
  return (
    <>
      <div className="h-[calc(100%_-_64px)] text-center bg-zinc-100">
        <h1 className="text-4xl pt-20 mb-8 font-extrabold">
          로그인이 필요한
          <br />
          서비스입니다.
        </h1>
        <a href={testRedirectURI}>
          <img
            src="/img/kakao_login_medium_wide.png"
            className="m-auto block cursor-pointer"
            style={{ WebkitUserDrag: "none" }}
          ></img>
        </a>
      </div>
    </>
  );
};

export default MyPage;
