import { useNavigate } from "react-router-dom";
import ShortsInfo from "./ShortsInfo";
import { useState } from "react";

// const ITEM_HEIGHT = Math.round(window.innerHeight) - 64;

const Shorts = ({ items, itemWidth, itemHeight }) => {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleMouseUp = (shortsId) => {
    if (!isDragging) {
      navigate("/art", {
        state: {
          shortsId,
        },
      });
    }
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  const handleMouseDown = () => {
    setIsDragging(false);
  };

  return (
    <>
      {items.map((image) => (
        <div key={image.id} className="relative w-full flex-shrink-0" style={{ height: `${itemHeight}px` }}>
          <img
            src={image.download_url}
            className="h-full object-cover"
            onMouseUp={() => handleMouseUp(image.id)}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
          />
          <ShortsInfo info={image.author} />
        </div>
      ))}
    </>
  );
};

export default Shorts;
