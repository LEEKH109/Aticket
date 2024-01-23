import { useEffect, useState } from "react";
import { Button } from "@mui/base";
import DialButton from "../components/DialButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

const Shorts = () => {
  const [collected, setCollected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const handleClickCollectionButton = () => {
    if (collected) {
      setCollected(false);
      // 컬렉션 삭제 로직
    } else {
      setCollected(true);
      // 컬렉션 추가 로직
    }
  };

  const handleClickCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleShortsClick = () => {
    console.log("move to detail");
  };

  useEffect(() => {
    // 해당 쇼츠 컬렉션 저장 유무 확인 로직
    setCollected(false);
  }, []);

  useEffect(() => {
    console.log(selectedCategory);
    // 카테고리 선택 로직
  }, [selectedCategory]);

  return (
    <>
      <div className="absolute z-50 top-4 left-4 flex gap-4">
        <DialButton handleClickCategory={handleClickCategory} selectedCategory={selectedCategory} />
      </div>
      <div className="h-[calc(100%_-_64px)] relative">
        <Link to="/" className="block h-full" onClick={handleShortsClick}>
          <img
            className="h-full object-cover"
            src="https://cdn.pixabay.com/photo/2023/07/27/18/57/beach-8153869_1280.jpg"
            alt=""
          />
        </Link>
        <div className="absolute z-10 w-full flex items-center justify-between pt-8 pb-4 px-2 bottom-0 bg-gradient-to-t from-black">
          <p className="text-white text-xl">무슨무슨 전시회</p>
          <Button onClick={handleClickCollectionButton}>
            {collected ? (
              <StarIcon fontSize="large" className=" text-white" />
            ) : (
              <StarBorderIcon fontSize="large" className=" text-white" />
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Shorts;
