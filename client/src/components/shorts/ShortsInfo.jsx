import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShortsAPI } from "../../util/shorts-axios";
import { LoginContext } from "../LoginContext";
import { Button } from "@mui/material";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Swal from "sweetalert2";

const ShortsInfo = ({ title, shortsId }) => {
  const [collected, setCollected] = useState(false);
  const { isLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleClickCollectionButton = () => {
    if (!isLogin) {
      Swal.fire({
        text: "로그인이 필요한 서비스입니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "로그인 하기",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/loginpage");
        }
      });
      return;
    }

    ShortsAPI.postLike(shortsId, { like: !collected })
      .then(({ data }) => {
        setCollected(data.data.like);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isLogin) {
      ShortsAPI.getLike(shortsId)
        .then(({ data }) => {
          setCollected(data.data.like);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="absolute z-10 w-full flex items-center justify-between pt-8 pb-2 px-2 bottom-0 bg-gradient-to-t from-black">
      <p className="ms-4 text-white text-xl font-bold">{title}</p>
      <Button onClick={handleClickCollectionButton}>
        {collected ? (
          <StarRoundedIcon fontSize="large" className=" text-white" />
        ) : (
          <StarBorderRoundedIcon fontSize="large" className=" text-white" />
        )}
      </Button>
    </div>
  );
};

export default ShortsInfo;
