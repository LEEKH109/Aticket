import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KakaoOAuth from "../util/oauth";
import KakaoIcon from "../components/KakaoIcon";

const StartPage = () => {
  const [logoOpacity, setLogoOpacity] = useState(0);
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1600716051809-e997e11a5d52?q=80&w=1150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    setLogoOpacity(100);
  });

  return (
    <>
      <div className="h-[calc(100%_-_64px)] flex flex-col align-middle justify-items-center justify-center text-center">
        <div
          className={`m-auto mt-0 mb-0 transition-opacity ease-in-out duration-1000 opacity-${logoOpacity}`}
        >
          <img className="w-64" src="/img/logo.png" />
        </div>
        <p className="mt-10" />
        <h1 className="text-4xl leading-10 mb-8 font-extrabold p-10">
          지금 바로 아티켓과 함께하세요.
        </h1>
        <div className="w-full h-screen bg-slate-700 flex flex-col">
          <div className="flex-grow overflow-hidden relative bg-yellow-500">
            <div
              className="flex transition-transform duration-1000 w-full h-full"
              style={{ transform: `translateX(-${activeStep * 100}%)` }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="min-w-full h-full bg-cover"
                  style={{ backgroundImage: `url(${image})` }}
                />
              ))}
            </div>
          </div>
          <div className="w-full">
            <MobileStepper
              variant="dots"
              steps={4}
              position="static"
              activeStep={activeStep}
              className="w-full"
              nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === 3}>
                  다음
                  {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  이전
                </Button>
              }
            />
          </div>
        </div>
        <div className="flex justify-center">
          <hr></hr>
          <div className="w-[30vh] h-[20vh]">
            <Button
              variant="contained"
              sx={{
                width: "100%",
                height: "4.8vh",
                position: "relative",
                marginTop: "3vh",
                backgroundColor: "#397D54",
                ":hover": {
                  backgroundColor: "#235D3A",
                },
              }}
            >
              시작하기
            </Button>
            <Button
              onClick={() => {}}
              variant="contained"
              sx={{
                width: "100%",
                height: "4.8vh",
                position: "relative",
                marginTop: "3vh",
                backgroundColor: "#FEE500",
                ":hover": {
                  backgroundColor: "#FDD835",
                },
                color: "#000",
              }}
              startIcon={<KakaoIcon />}
            >
              카카오로 로그인하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default StartPage;