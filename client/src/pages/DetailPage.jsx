import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Button from "@mui/material/Button";
import { useLoginState } from "../components/LoginContext";

const DetailPage = () => {
  const location = useLocation();
  const { shortsId } = location.state;
  const navigate = useNavigate();
  const [shortInfo, setShortInfo] = useState({download_url:undefined});
  const [infoLoad, setInfoLoad] = useState(true);
  const isLogin = useLoginState();
  const getShortsInfo = (shortsId) => {
    // InfoAPI.getInfo(shortsId).then((res) => {
    //   setShortInfo(res.data);
    //   setInfoLoad(false);
    // });
  };

  useEffect(() => {
    getShortsInfo(shortsId);
  }, []);

  return (
    <main className="relative h-[calc(100vh_-_64px)] mx-auto">
      <div className="flex w-full h-12 items-center justify-center bg-slate-600">
        <Button
          sx={{ justifySelf: "flex-start" }}
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >&lt;</Button>
        <h1 className="text-white flex-grow text-center pr-6">{shortsId}번 작품</h1>
      </div>
      <div className="overflow-y-scroll h-[calc(100vh_-_112px)] bg-cover bg-center" style={{backgroundImage: `url(${shortInfo.download_url})`}}>
        <div className="h-[68vh]">

        </div>
        <div className="bg-white w-full h- rounded-tl-2xl rounded-tr-2xl pr-5 pl-5 pt-5 pb-[20vh] leading-8">
        <h1 className="font-bold text-2xl">무슨무슨무슨무슨展</h1>
        <h2 className="text-gray-400">무슨무슨무슨무슨</h2>
        <hr className="my-[2vh]"/>
        <h2>작가 : {shortInfo.author}</h2>
        <h2>주연 : {shortInfo.author}, {shortInfo.author}, {shortInfo.author}</h2>
        <hr className="my-[2vh]"/>
        <h1 className="font-bold text-2xl pb-4">작품 상세설명</h1>
        <div className="text-center bg-slate-400 w-full h-[100vh]">
            인포이미지
        </div>
        <p className="h-[4vh]"></p>
        <div className="text-center bg-slate-400 w-full h-[20vh]">
            채팅창?????
        </div>
        </div>
      </div>


      <div className="h-12 w-full relative bottom-[6.4vh]">
        {
          isLogin!=null && isLogin ?
          <Button
          sx={{width:"100%", height:"100%"}}
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
          >예매하기</Button>
          :
          <div className="bg-gray-200 h-[48px] w-full rounded-lg text-gray-400 text-center flex justify-center items-center">
            로그인이 필요한 서비스입니다.
          </div>
        }
      </div>
    </main>
  );
};

export default DetailPage;
