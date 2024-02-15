import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KakaoOAuth from "../util/oauth";
import KakaoIcon from "../components/KakaoIcon";

const StartPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <div className="h-[calc(100%_-_64px)] flex flex-col align-middle justify-items-center justify-center text-center overflow-hidden bg-center bg-[url('/img/startbg.jpg')] bg-cover">
        <div className={`m-auto pt-20 mb-0 animate-logoFade`}>
          <img className="w-64" src="/img/logo.png" />
        </div>
        <h1
          className="text-4xl leading-10 font-extrabold p-10 opacity-0 animate-textFade"
          style={{ animationDelay: "0.9s" }}
        >
          지금 바로 아티켓과 함께하세요.
        </h1>
        <div
          className="w-full h-screen flex flex-col opacity-0 animate-bgFade"
          style={{ animationDelay: "1.6s" }}
        >
          <div className="flex-grow overflow-hidden relative">
            <div
              className="flex transition-transform duration-500 ease w-full h-full"
              style={{ transform: `translateX(-${activeStep * 100}%)` }}
            >
              <div className="min-w-full h-full flex flex-col items-center">
                <div className="flex flex-col items-center w-[80%] h-[30vh] bg-white px-10 shadow-lg rounded-xl">
                  <img src="/img/one.png" className="w-[5vh] self-start" />
                  <img src="/img/icon-scroll.gif" className="w-[10vh] pb-6" />
                  <p className="text-xl mb-10 font-semibold break-normal">
                    간단하게 위 아래로 넘겨서 전시와 공연을 찾아보세요.
                  </p>
                </div>
              </div>
              <div className="min-w-full h-full flex flex-col items-center">
                <div className="flex flex-col items-center w-[80%] h-[30vh] bg-white px-10 shadow-lg rounded-xl">
                  <img src="/img/two.png" className="w-[5vh] self-start" />
                  <img src="/img/icon-favorite.gif" className="w-[10vh] pb-6" />
                  <p className="text-lg mb-10 font-semibold break-normal">
                    마음에 드는 전시나 공연을 컬렉션에 저장하고, 예매하세요!
                  </p>
                </div>
              </div>
              <div className="min-w-full h-full flex flex-col items-center">
                <div className="flex flex-col items-center w-[80%] h-[30vh] bg-white px-10 shadow-lg rounded-xl">
                  <img
                    src="/img/three.png"
                    className="w-[5vh] self-start"
                  />
                  <img src="/img/icon-bubble.gif" className="w-[10vh] pb-6" />
                  <p className="text-lg mb-10 font-semibold break-normal">
                    채팅을 통해 다른 이용자들과 전시 및 공연 정보를 공유해보세요.
                  </p>
                </div>
              </div>
              <div className="min-w-full h-full flex flex-col items-center">
                <div className="flex flex-col items-center w-[80%] h-[30vh] bg-white px-10 shadow-lg rounded-xl">
                  <img
                    src="/img/four.png"
                    className="w-[5vh] self-start"
                  />
                  <img src="/img/icon-start.gif" className="w-[10vh] pb-6" />
                  <p className="text-xl mb-10 font-semibold break-normal">
                    끝입니다! 이제 아티켓으로 간편하게 시작해보세요!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-transparent flex justify-center flex-grow">
            <MobileStepper
              variant="dots"
              steps={4}
              position="static"
              activeStep={activeStep}
              className="w-full"
              sx={{
                width:"80%",
                backgroundColor: "#222222",
                height: "7vh",
                opacity: "0.8",
                borderRadius:"15px",
                "& .MuiMobileStepper-dot": {
                  backgroundColor: "#cccccc",
                },
                "& .MuiMobileStepper-dotActive": {
                  backgroundColor: "#ffffff",
                },
              }}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === 3}
                  sx={{ color: "#ffffff" }}
                >
                  다음
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  sx={{ color: "#ffffff" }}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  이전
                </Button>
              }
            />
          </div>
        </div>
        <div
          className="animate-bgFade opacity-0"
          style={{ animationDelay: "2.2s" }}
        >
          <hr className="border-white w-full border-1 opacity-50"></hr>
          
          <div className="relative z-10 py-7">
          <Button
                onClick={() => {
                  navigate("/short");
                }}
                variant="outlined"
                sx={{
                  width: "80%",
                  height: "6vh",
                  position: "relative",
                  borderColor: "#397d54",
                  borderWidth: "2px",
                  color: "#ffffff",
                  backgroundColor: "#397d54",
                  borderRadius:"24px",
                  boxShadow:"initial",
                  fontSize: "2.3vh",
                  fontWeight: "bold",
                  ":hover": {
                    borderColor: "#83bf93",
                    backgroundColor: "#83bf93",
                    color: "#ffffff",
                  },
                }}
              >
                시작하기
              </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default StartPage;
