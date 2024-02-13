import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ShortsInfo from "./ShortsInfo";
import Shorts from "./Shorts";

// const ITEM_HEIGHT = Math.round(window.innerHeight) - 64;

const ShortsList = ({ viewDetailLog, closeDetail, shortsIdList, itemHeight, currentIndex }) => {
  console.log("shorts list", currentIndex);
  return (
    <>
      {shortsIdList.map((shortsId, index) => (
        <Shorts
          key={shortsId}
          shortsId={shortsId}
          itemHeight={itemHeight}
          viewDetailLog={viewDetailLog}
          closeDetail={closeDetail}
          isRendering={index == currentIndex - 1 || index == currentIndex + 1}
        />
      ))}
    </>
  );
};

export default ShortsList;
