import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactPlayer from "react-player";
import ShortsInfo from "./ShortsInfo";

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
          {image.type == "video" ? (
            <video
              autoPlay
              loop
              className="h-full object-cover"
              onMouseUp={() => handleMouseUp(image.id)}
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
            >
              <source src={image.download_url} type="video/mp4" />
            </video>
          ) : (
            <img
              src={image.download_url}
              className="h-full object-cover"
              onMouseUp={() => handleMouseUp(image.id)}
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
            />
          )}
          <ShortsInfo info={image.author} />
        </div>
      ))}
    </>
  );
};

export default Shorts;
