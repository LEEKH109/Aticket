import { CircularProgress } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../components/LoginContext";
import axios from "axios";

const LoginLoad = (props) => {
  const { setLogin } = useContext(LoginContext);
  const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    useEffect(()=>{
      console.log(code);
        const LoginProgress = async () => {
            // await axios({
            //     method: "GET",
            //     url: `${import.meta.env.VITE_REDIRECT_URI}/?code=${code}`,
            //     headers: {
            //       "Content-Type": "application/json;charset=utf-8",
            //       "Access-Control-Allow-Origin":"*" // cors 에러 방지
            //     },
            // }).then((res)=>{
            //   console.log(res);
            //   localStorage.setItem("name", res.data.account.kakaoName);
            // });
            localStorage.setItem("id", "test");
            localStorage.setItem("token", "testToken");
            setLogin(true);
            navigate("/");
        };
        LoginProgress();
    }, );
    return (
    <>
      <div className="h-[calc(100%_-_64px)] flex-col align-middle content-center justify-center items-center bg-slate-100 text-center">
        <div className="pt-20 pb-10 m-auto">
          <CircularProgress />
        </div>
        <div className="m-auto">
          <h1>로그인 중 입니다.</h1>
          <h1>잠시만 기다려주세요...</h1>
        </div>
      </div>
    </>
  );
};

export default LoginLoad;
