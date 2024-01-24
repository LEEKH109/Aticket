import { useEffect, useState } from "react";
import { Button } from "@mui/base";
import DialButton from "../components/DialButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import KakaoLogin from "../components/KakaoLogin";

const MyPage = () => {
  const loginStart = () => {
    
    console.log("login start");
  }

  return (
    <>
      <div className="h-[calc(100%_-_64px)] relative text-center">
        <h1 className="text-4xl pt-20 mb-8 font-extrabold text-white">
          로그인이 필요한
          <br />
          서비스입니다.
        </h1>
        <KakaoLogin/>
      </div>
    </>
  );
};

export default MyPage;
