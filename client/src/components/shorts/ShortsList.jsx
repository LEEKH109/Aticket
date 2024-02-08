import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ShortsInfo from "./ShortsInfo";
import Shorts from "./Shorts";

// const ITEM_HEIGHT = Math.round(window.innerHeight) - 64;

const ShortsList = ({ shortsList, itemWidth, itemHeight }) => {
  return (
    <>
      {shortsList.map((shorts) => (
        <Shorts key={shorts.shortsId} shorts={shorts} itemHeight={itemHeight} />
      ))}
    </>
  );
};

export default ShortsList;
