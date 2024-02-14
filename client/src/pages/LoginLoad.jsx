import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { LoginContext } from "../components/LoginContext";
import { UserApi } from "../util/user-axios";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const LoginLoad = () => {
  const { setLogin, setUserId, setProfileImg } = useContext(LoginContext);
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false); // 로딩 실패시 alert 출력
  
  const code = new URL(window.location.href).searchParams.get("code");
  const LoginProgress = async () => {
    await axios({
      method: "GET",
      url: `http://i10a704.p.ssafy.io:8081${import.meta.env.VITE_REDIRECT_URI}?code=${code}`,
      headers: {
        "Access-Control-Allow-Origin": "http://i10a704.p.ssafy.io:8081",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      },
    })
      .then(async (res) => {
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
        await UserApi.getUserInfo(res.data.data.userId)
        .then((userRes) => {
          const data = userRes.data.data;
          console.log('Login Info', [res, userRes]);
          localStorage.setItem("userId", res.data.data.userId);
          localStorage.setItem("profileImg", data.profileUrl);
          setLogin(true);
          setUserId(res.data.data.userId);
          setProfileImg(data.profileUrl);
          navigate("/short");
        })
        .catch((err) => setOpenAlert(true));
      })
      .catch((err) => setOpenAlert(true));
  };

  useEffect(() => {
    LoginProgress();
  }, []);

  return (
    <>
      <Dialog open={openAlert} onClose={()=>{navigate('/loginpage');}}>
        <DialogTitle>
          {"오류"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            로그인 도중 오류가 발생하였습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{navigate('/loginpage');}}>확인</Button>
        </DialogActions>
      </Dialog>
      <div className="h-[calc(100%_-_64px)] align-middle flex justify-center items-center bg-slate-100 text-center">
        <div className="items-center">
        <div className="pt-20 pb-10 m-auto">
          <CircularProgress size={60} />
        </div>
        <div className="m-auto">
          <h1>로그인 중 입니다.</h1>
          <h1>잠시만 기다려주세요...</h1>
        </div>
        </div>
      </div>
    </>
  );
};

export default LoginLoad;
