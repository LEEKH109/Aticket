import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const ShortsInfo = ({ info }) => {
  const [collected, setCollected] = useState(false);

  const handleClickCollectionButton = () => {
    if (collected) {
      setCollected(false);
      // 컬렉션 삭제 로직
    } else {
      setCollected(true);
      // 컬렉션 추가 로직
    }
  };

  return (
    <div className="absolute z-10 w-full flex items-center justify-between pt-8 pb-2 px-2 bottom-0 bg-gradient-to-t from-black">
      <p className="ms-4 text-white text-xl">{info}</p>
      <Button onClick={handleClickCollectionButton}>
        {collected ? (
          <StarIcon fontSize="large" className=" text-white" />
        ) : (
          <StarBorderIcon fontSize="large" className=" text-white" />
        )}
      </Button>
    </div>
  );
};

export default ShortsInfo;
