import { useEffect, useState } from "react";
import DialButton from "../components/shorts/DialButton";
import Carousel from "../components/shorts/Carousel";
import { ShortsAPI } from "../util/shorts-axios";

const Shorts = () => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight - 64);
  const [collected, setCollected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [shortList, setShortList] = useState([{type:''}]);
  const getShortsList = () => {
    // ShortsAPI.getShorts().then((res) => {
    //   setShortList(res.data);
    // });
    setShortList([
      {
        id: 3,
        download_url: "https://cdn.pixabay.com/photo/2023/07/04/08/31/cats-8105667_960_720.jpg",
        author: "artellliii72",
        type: "image",
      },
      {
        id: 4,
        download_url: "https://cdn.pixabay.com/photo/2023/11/17/12/46/cat-8394224_960_720.jpg",
        author: "DusoSK",
        type: "image",
      },
      {
        id: 1,
        download_url: "/media/video1.mp4",
        author: "newjeans_nangman",
        type: "video",
      },
      {
        id: 2,
        download_url: "/media/video2.mp4",
        author: "im_nabelt",
        type: "video",
      },
    ]);
  };

  const handleClickCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleHeightResize = () => {
    setInnerHeight(window.innerHeight - 64);
  };

  useEffect(() => {
    getShortsList();
  }, []);

  useEffect(() => {
    // 해당 쇼츠 컬렉션 저장 유무 확인 로직
    setCollected(false);
  }, []);

  useEffect(() => {
    console.log(selectedCategory);
    // 카테고리 선택 로직
  }, [selectedCategory]);

  useEffect(() => {
    window.addEventListener("resize", handleHeightResize);

    return () => {
      window.removeEventListener("resize", handleHeightResize);
    };
  }, []);

  return (
    <>
      <div className="absolute z-50 top-4 left-4 flex gap-4">
        <DialButton handleClickCategory={handleClickCategory} selectedCategory={selectedCategory} />
      </div>
      <Carousel shortList={shortList} height={innerHeight} />
    </>
  );
};

export default Shorts;
