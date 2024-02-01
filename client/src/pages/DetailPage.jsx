import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Button from "@mui/material/Button";
import { useLoginState } from "../components/LoginContext";
import { DetailApi } from "../util/details-axios";
import { dateFormatter, dateFormmatterWithTime } from "../util/dateFormatter";
const DetailPage = () => {
  const location = useLocation();
  const { shortsId } = location.state;
  const navigate = useNavigate();
  const isLogin = useLoginState();

  const [shortInfo, setShortInfo] = useState({actors:[], infoUrls:[], startDate:'1900-01-01', endDate:'1900-01-01'});
  const [infoLoad, setInfoLoad] = useState(
    <div className="absolute w-full h-full bg-gray-300 opacity-70 flex justify-center">
      <CircularProgress
      sx={{alignSelf:"center"}}
      />
    </div>
  );

  const getShortsInfo = (shortsId) => {
    DetailApi.getDetail(shortsId).then((res)=>{
      setShortInfo(res.data);
      setInfoLoad([]);
     });
  };

  useEffect(() => {
    getShortsInfo(shortsId);
  }, []);

  return (
    <main className="relative h-[calc(100vh_-_64px)] mx-auto bg-slate-300">
      { infoLoad }
      <div className="flex w-full h-12 items-center justify-center bg-slate-600">
        <Button
          sx={{ justifySelf: "flex-start" }}
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >&lt;</Button>
        <h1 className="text-white flex-grow text-center pr-6">여기다 뭐넣지???</h1>
      </div>
      <div className="overflow-y-scroll h-[calc(100vh_-_112px)] bg-cover bg-center" style={{backgroundImage: `url(${shortInfo.posterUrl})`}}>
        <div className="h-[68vh]">

        </div>
        <div className="bg-white w-full rounded-tl-2xl rounded-tr-2xl p-5 pb-20 leading-8">
        <h1 className="font-bold text-2xl">{shortInfo.title}</h1>
        <h2 className="text-gray-400">{shortInfo.location}</h2>
        <hr className="my-[2vh]"/>
        <h2>기간 : {dateFormmatterWithTime(new Date(shortInfo.startDate))} ~ {dateFormmatterWithTime(new Date(shortInfo.endDate))}</h2>
        <h2>주연 : {shortInfo.actors}</h2>
        <hr className="my-[2vh]"/>
        <h1 className="font-bold text-2xl pb-4">작품 상세설명</h1>
        {shortInfo.infoUrls.map((infoUrl, index) => (<img key={index} src={infoUrl} className="w-full justify-center"/>))}
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
          <div className="bg-gray-200 h-[48px] w-full rounded-lg text-gray-500 text-center flex justify-center items-center">
            로그인이 필요한 서비스입니다.
          </div>
        }
      </div>
    </main>
  );
};

export default DetailPage;
