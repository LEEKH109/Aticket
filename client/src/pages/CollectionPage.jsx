import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Carousel from "../components/shorts/Carousel";
import ShortsLoading from "../components/shorts/ShortsLoading";
import { UserApi } from "../util/user-axios";

const Shorts = () => {
  const location = useLocation();

  const [innerHeight, setInnerHeight] = useState(window.innerHeight - 64);
  const [shortsIdList, setShortsIdList] = useState([]);
  const index = useRef(location.search.split("=")[1]);

  const handleHeightResize = () => {
    setInnerHeight(window.innerHeight - 64);
  };

  useEffect(() => {
    UserApi.getCollections()
      .then(({ data }) => {
        setShortsIdList(data.data.map((shorts) => shorts.shortsId));
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleHeightResize);

    return () => {
      window.removeEventListener("resize", handleHeightResize);
    };
  }, []);

  return (
    <>
      {shortsIdList?.length > 0 ? (
        <Carousel shortsIdList={shortsIdList} height={innerHeight} index={index.current} />
      ) : (
        <ShortsLoading />
      )}
    </>
  );
};

export default Shorts;
