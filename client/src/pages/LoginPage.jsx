import KakaoOAuth from "../components/OAuth";
const MyPage = () => {
  return (
    <>
      <div className="h-[calc(100%_-_64px)] flex-col align-middle justify-items-center justify-center text-center bg-zinc-100">
        <div className="h-10 p-10 m-auto">
        <img src="/img/logo.png"/>
        </div>
        <p className="mt-10"/>
        <h1 className="text-4xl leading-10 mb-8 font-extrabold p-10">
          지금 바로 아티켓과 함께하세요.
        </h1>
        <a href={KakaoOAuth}>
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
