import { useEffect, useRef, useState } from "react";
import Carousel from "../components/shorts/Carousel";
import { useLocation } from "react-router-dom";
import { UserApi } from "../util/user-axios";

const Shorts = () => {
  const location = useLocation();

  const [innerHeight, setInnerHeight] = useState(window.innerHeight - 64);
  const [shortList, setShortList] = useState([]);
  const index = useRef(location.search.split("=")[1]);

  const handleHeightResize = () => {
    setInnerHeight(window.innerHeight - 64);
  };

  useEffect(() => {
    UserApi.getCollections()
      .then(({ data }) => {
        setShortList(data.data);
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
      <Carousel shortList={shortList} height={innerHeight} index={index.current} />
    </>
  );
};

export default Shorts;
