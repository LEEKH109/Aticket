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
      <div className="h-[calc(100%_-_64px)] flex flex-col text-center items-center bg-center bg-[url('/img/startbg.jpg')] bg-cover overflow-hidden">
        <div className={`mx-auto pt-[20vh] pb-[8vh] mb-0 flex-grow-0`}>
          <img className="w-64" src="/img/logo.png" />
        </div>
        <h1
          className="text-4xl leading-10 font-extrabold px-10 opacity-0 animate-textFade flex-1"
        >
          지금 바로 아티켓과 함께하세요.
        </h1>
        <div className="w-[80%]">
        <Button
          onClick={() => {
            window.location.href = KakaoOAuth;
          }}
          variant="contained"
          sx={{
            width: "100%",
            height: "45px",
            position: "relative",
            marginTop: "8vh",
            backgroundColor: "#FEE500",
            ":hover": {
              backgroundColor: "#FDD835",
            },
            color: "#000",
          }}
          startIcon={<KakaoIcon />}
        >
          카카오로 로그인
        </Button>
        </div>
        <div className="flex-1"/>
        
      </div>
    </>
  );
};
export default StartPage;
