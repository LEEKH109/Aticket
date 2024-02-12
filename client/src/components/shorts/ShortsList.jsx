import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ShortsInfo from "./ShortsInfo";
import Shorts from "./Shorts";

// const ITEM_HEIGHT = Math.round(window.innerHeight) - 64;

const ShortsList = ({ viewDetailLog, closeDetail, shortsList, itemWidth, itemHeight }) => {
  return (
    <>
      {shortsList.map((shorts) => (
        <Shorts
          key={shorts.shortsId}
          shorts={shorts}
          itemHeight={itemHeight}
          viewDetailLog={viewDetailLog}
          closeDetail={closeDetail}
        />
      ))}
    </>
  );
};

export default ShortsList;
