import { useContext, useEffect, useState } from "react";
import DialButton from "../components/shorts/DialButton";
import Carousel from "../components/shorts/Carousel";
import { ShortsAPI } from "../util/shorts-axios";
import { LoginContext } from "../components/LoginContext";

const Shorts = () => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight - 64);
  const [category, setCategory] = useState("");
  const [shortList, setShortList] = useState([]);
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
          setShortList(data.data);
        })
        .catch((err) => console.error(err));
    } else {
      ShortsAPI.getShortsList(category)
        .then(({ data }) => {
          setShortList(data.data);
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
      <div className="absolute z-50 top-4 left-4 flex gap-4">
        <DialButton handleClickCategory={handleClickCategory} selectedCategory={category} />
      </div>
      <Carousel shortList={shortList} height={innerHeight} />
    </>
  );
};

export default Shorts;
