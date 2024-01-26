import { useEffect, useState } from "react";
import DialButton from "../components/DialButton";
import Carousel from "../components/Carousel";
import { ShortsAPI } from "../util/shorts-axios";

const Shorts = () => {
  const [collected, setCollected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [shortList, setShortList] = useState([]);

  const getShortsList = () => {
    ShortsAPI.getShorts().then((res) => {
      setShortList(res.data);
    });
  };

  useEffect(() => {
    getShortsList();
  }, []);

  const handleClickCategory = (category) => {
    setSelectedCategory(category);
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
      <Carousel shortList={shortList} />
    </>
  );
};

export default Shorts;
