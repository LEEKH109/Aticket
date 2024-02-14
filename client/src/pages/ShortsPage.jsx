import { useContext, useEffect, useState } from "react";
import ShortsLoading from "../components/shorts/ShortsLoading";
import DialButton from "../components/shorts/DialButton";
import Carousel from "../components/shorts/Carousel";
import { LoginContext } from "../components/LoginContext";
import { ShortsAPI } from "../util/shorts-axios";

const Shorts = () => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight - 64);
  const [category, setCategory] = useState("");
  const [shortsIdList, setShortsIdList] = useState([]);
  const { userId } = useContext(LoginContext);

  const handleClickCategory = (category) => {
    setCategory(category);
  };

  const handleHeightResize = () => {
    setInnerHeight(window.innerHeight - 64);
  };

  useEffect(() => {
    if (userId) {
      ShortsAPI.getRecommendShortsList(category)
        .then(({ data }) => {
          setShortsIdList(data.data.map((shorts) => shorts.shortsId));
        })
        .catch((err) => console.error(err));
    } else {
      ShortsAPI.getShortsList(category)
        .then(({ data }) => {
          setShortsIdList(data.data.map((shorts) => shorts.shortsId));
        })
        .catch((err) => console.error(err));
    }
  }, [category]);

  useEffect(() => {
    window.addEventListener("resize", handleHeightResize);

    return () => {
      window.removeEventListener("resize", handleHeightResize);
    };
  }, []);

  return (
    <>
      <div className="absolute z-50 top-4 left-4 flex gap-4 text-small">
        <DialButton onClickCategory={handleClickCategory} selectedCategory={category} />
      </div>
      {shortsIdList?.length > 0 ? (
        <Carousel shortsIdList={shortsIdList} height={innerHeight} />
      ) : (
        <ShortsLoading height={innerHeight} />
      )}
    </>
  );
};

export default Shorts;
