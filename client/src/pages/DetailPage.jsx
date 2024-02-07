import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from "@mui/material/Button";
import { useLoginState } from "../components/LoginContext";
import { DetailApi } from "../util/details-axios";
import { dateFormmatterWithTime } from "../util/dateFormatter";
import { IconButton } from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
const DetailPage = () => {
  const location = useLocation();
  const { shortsId } = location.state;
  const navigate = useNavigate();
  const isLogin = useLoginState();
  const scrollRef = useRef(null);

  const [openPoster, setOpenPoster] = useState(false); // 포스터 클릭시 확대
  const [scorllPos, setScrollPos] = useState(0); // 스크롤 감지
  const [category, setCategory] = useState();
  const [shortInfo, setShortInfo] = useState({actors:['-'], infoUrls:[], startDate:'1900-01-01', endDate:'1900-01-01'});
  const [infoLoad, setInfoLoad] = useState(
    <div className="absolute w-full h-full bg-gray-300 opacity-70 flex justify-center">
      <CircularProgress
      sx={{alignSelf:"center"}}
      />
    </div>
  );
  
  /* 포스터 이미지 확대 및 닫기 */
  const handleOpenPoster = () => setOpenPoster(true);
  const handleClosePoster = () => setOpenPoster(false);
 
  /* 전시 및 공연 정보 세팅 */
  const getShortsInfo = (shortsId) => {
    DetailApi.getDetail(shortsId).then((res)=>{
      if(res.data.category==="MUSICAL") {
        setCategory("뮤지컬");
      } else if(res.date.category==="SHOW") {
        setCategory("전시");
      } else if(res.data.category==="PLAY") {
        setCategory("공연");
      }
      setShortInfo(res.data);
      if(res.data.actors[0] === '') {
        res.data.actors[0] = '-';
      }
      setInfoLoad([]);
     });
  };

  useEffect(() => {
    getShortsInfo(shortsId); // 전시 및 공연 정보 가져오기
    /* 스크롤 감지 */
    const updateScroll = (event) => {
      setScrollPos(event.target.scrollTop);
    };
    const scrollElement = scrollRef.current;
    if(scrollElement) {
      scrollElement.addEventListener('scroll', updateScroll);
    }
    return () => {
      if(scrollElement) {
        scrollElement.removeEventListener('scroll', updateScroll); // 컴포넌트 언마운트시 스크롤이벤트 제거
      }
    }
  }, []);


  return (
    <main className="relative h-[calc(100vh_-_64px)] mx-auto bg-slate-300">
      <Modal
        open={openPoster}
        onClose={handleClosePoster}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="justify-center flex">
        <Box onClick={handleClosePoster} sx={{position:'absolute', top:'15%',tranform:'trnaslate(-50%, -50%)', width:'80%', height:'60%', maxWidth:'360px' ,border:'2px solid #000000', boxShadow:'24', backgroundSize:'100% 100%' , backgroundPosition:'center' ,backgroundImage:`url(${shortInfo.posterUrl})`}}>
        </Box>
        </div>
      </Modal>
      { infoLoad }
      <div className="fixed w-full h-[6vh]">
        <IconButton
        sx={{":hover":{backgroundColor:'#000000'}, backgroundColor:'#666666', 
        width:'5vh', height:'5vh', marginLeft:'0.6vh', marginTop:'0.6vh'}}
        onClick={() => {
          navigate(-1);
        }}
        >
        <KeyboardBackspaceIcon sx={{color:'white'}}/>
        </IconButton>
      </div>
      <div className={`fixed w-full max-w-[412px] container h-[6vh] bg-gray-500 flex items-center justify-between 
      transition-opacity ease-in-out duratino-500 ${scorllPos > 650 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <IconButton
      sx={{ width:'5vh', height:'5vh', marginLeft:'0.6vh', marginTop:'0.2vh'}}
      onClick={() => {
        navigate(-1);
      }}
      >
      <KeyboardBackspaceIcon sx={{color:'white'}}/>
      </IconButton>
      <div className="text-white text-xl flex-1 mx-4 truncate text-center">{shortInfo.title}</div>
      <div className="w-12"></div>
    </div>
    
      
      <div ref={scrollRef} className="overflow-y-scroll h-[calc(100vh_-_64px)] bg-cover bg-center" style={{backgroundImage: `url(${shortInfo.posterUrl})`}}>
        <div className="h-[68vh]" onClick={handleOpenPoster}>
        </div>
        <div className="bg-white w-full rounded-tl-2xl rounded-tr-2xl p-5 pb-20 leading-8">
        <h1 className="font-bold text-xl">{shortInfo.title}</h1>
        <h2 className="text-gray-400 text-lg">{category}</h2>
        <hr className="my-[2vh]"/>
        <h2 className="font-bold text-lg">장소</h2>
        {shortInfo.location}
        <p className="my-3"/>
        <h2 className="font-bold text-lg">기간</h2>
        {dateFormmatterWithTime(new Date(shortInfo.startDate))} ~ {dateFormmatterWithTime(new Date(shortInfo.endDate))}
        <p className="my-3"/>
        <h2 className="font-bold text-lg">주연</h2>
        <h3 className="text-base">{shortInfo.actors}</h3>
        <p className="my-3"/>
        <hr className="my-[2vh]"/>
        <h1 className="font-bold text-lg pb-4">작품 상세설명</h1>
        {shortInfo.infoUrls.map((infoUrl, index) => (<img key={index} src={infoUrl} className="w-full justify-center"/>))}
        <p className="h-[4vh]"></p>
        <div className="text-center bg-slate-400 w-full h-[20vh]">
            <ChatPreview category={shortInfo.category}/>
        </div>
        </div>
      </div>


      <div className="h-13 w-full relative bottom-[5.2vh]">
        {
          isLogin!=null && isLogin ?
          <Button
          sx={{width:"100%", height:"5.25vh"}}
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
          >예매하기</Button>
          :
          <div className="bg-gray-200 h-[5.25vh] w-full rounded-lg text-gray-500 text-center flex justify-center items-center">
            로그인이 필요한 서비스입니다.
          </div>
        }
      </div>
    </main>
  );
};

export default DetailPage;
