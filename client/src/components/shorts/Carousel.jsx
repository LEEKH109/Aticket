import { useEffect, useRef, useState } from "react";
import ShortsList from "./ShortsList";
import { useLoginState } from "../LoginContext";
import { ShortsAPI } from "../../util/shorts-axios";

const Carousel = ({ shortsIdList, height, index = 0 }) => {
  const isLogin = useLoginState();
  const [currentIndex, setCurrentIndex] = useState(Number(index));
  const [isDragging, setIsDragging] = useState(false);
  const [transY, setTransY] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const carouselItemsRef = useRef(null);
  const positionYRef = useRef(0);
  const maxLen = useRef(0);

  const isTouchScreen = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const inRange = (value, min, max) => {
    if (value < min) {
      return min;
    }

    if (value > max) {
      return max;
    }

    return value;
  };

  const handleMouseDown = (clickEvent) => {
    const carouselItems = carouselItemsRef.current;

    setIsDragging(true);
    positionYRef.current = clickEvent.pageY;

    window.addEventListener("mousemove", handleMouseMove);
    carouselItems?.addEventListener("mouseup", handleMouseUp, { once: true });
  };

  const handleMouseMove = (moveEvent) => {
    const deltaY = positionYRef.current - moveEvent.pageY;

    if (moveEvent.clientY > height || moveEvent.clientY < 0) {
      window.removeEventListener("mousemove", handleMouseMove);
      setTransY(0);
      setIsDragging(false);
      return;
    }

    setTransY(inRange(deltaY, -height, height));
  };

  const handleMouseUp = (moveEvent) => {
    const deltaY = positionYRef.current - moveEvent.pageY;
    let nextIndex = currentIndex;

    if (deltaY < -100) {
      nextIndex = inRange(currentIndex - 1, 0, maxLen.current - 1);
      setCurrentIndex(nextIndex);
    }
    if (deltaY > 100) {
      nextIndex = inRange(currentIndex + 1, 0, maxLen.current - 1);
      setCurrentIndex(inRange(nextIndex));
    }

    setTransY(0);
    setIsDragging(false);

    if (currentIndex !== nextIndex) {
      handleViewLog(currentIndex, nextIndex, 0);
    }
    window.removeEventListener("mousemove", handleMouseMove);
  };

  const handleTouchStart = (touchEvent) => {
    const carouselItems = carouselItemsRef.current;
    positionYRef.current = touchEvent.touches[0].pageY;

    setIsDragging(true);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    carouselItems?.addEventListener("touchend", handleTouchEnd, { once: true });
  };

  const handleTouchMove = (moveEvent) => {
    const move = moveEvent.touches[0];
    const deltaY = positionYRef.current - move.pageY;

    if (move.clientY > height || move.clientY < 0) {
      window.removeEventListener("touchmove", handleTouchMove);
      setTransY(0);
      setIsDragging(false);
      return;
    }

    setTransY(inRange(deltaY, -height, height));
  };

  const handleTouchEnd = (moveEvent) => {
    const move = moveEvent.changedTouches[0];
    const deltaY = positionYRef.current - move.pageY;
    let nextIndex = currentIndex;

    if (deltaY < -100) {
      nextIndex = inRange(currentIndex - 1, 0, maxLen.current - 1);
      setCurrentIndex(nextIndex);
    }
    if (deltaY > 100) {
      nextIndex = inRange(currentIndex + 1, 0, maxLen.current - 1);
      setCurrentIndex(inRange(nextIndex));
    }

    setTransY(0);
    setIsDragging(false);

    handleViewLog(currentIndex, nextIndex, 0);

    window.removeEventListener("touchmove", handleTouchMove);
  };

  const handleViewLog = (curIdx, nextIdx, viewDetail) => {
    if (curIdx !== nextIdx && isLogin.isLogin) {
      let viewTime = (new Date() - startTime) / 1000;
      ShortsAPI.viewLog(shortsIdList[curIdx], {
        viewDetail: viewDetail,
        viewTime: viewTime,
      });
      setStartTime(new Date());
    }
  };

  useEffect(() => {
    maxLen.current = shortsIdList.length;
  }, [shortsIdList.length]);

  useEffect(() => {
    setStartTime(new Date());
  }, [currentIndex]);

  useEffect(() => {
    const carouselItems = carouselItemsRef.current;

    if (isTouchScreen) {
      carouselItems?.addEventListener("touchstart", handleTouchStart, { passive: true });

      return () => {
        carouselItems?.removeEventListener("touchstart", handleTouchStart);
      };
    }
    carouselItems?.addEventListener("mousedown", handleMouseDown);

    return () => {
      carouselItems?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isDragging]);

  useEffect(() => {
    carouselItemsRef.current.style.transform = `translateY(${-(currentIndex * height + transY)}px)`;
  }, [transY]);

  return (
    <div className="overflow-hidden max-w-[450px]" style={{ height: `${height}px` }}>
      <div
        ref={carouselItemsRef}
        className="flex flex-col"
        style={{ transition: `transform ${transY ? 0 : 300}ms ease-in-out 0s` }}
      >
        <ShortsList
          viewDetailLog={() => {
            handleViewLog(currentIndex, -1, 1);
          }}
          closeDetail={() => {
            setStartTime(new Date());
          }}
          shortsIdList={shortsIdList}
          itemHeight={height}
          currentIndex={currentIndex}
        />
      </div>
    </div>
  );
};
export default Carousel;
