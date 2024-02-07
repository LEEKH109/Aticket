import { useEffect, useRef, useState } from "react";
import Shorts from "./Shorts";

const ITEM_WIDTH = 412;

const Carousel = ({ shortList, height}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [transY, setTransY] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const carouselItemsRef = useRef(null);
  const positionYRef = useRef(0);
  const maxLen = useRef(0);

  const isTouchScreen =
    typeof window !== "undefined" && window.matchMedia("(hover: none) and (pointer: coarse)").matches;

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
    clickEvent.preventDefault();
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

    if (deltaY < -150) {
      nextIndex = inRange(currentIndex - 1, 0, maxLen.current - 1);
      setCurrentIndex(nextIndex);
    }
    if (deltaY > 150) {
      nextIndex = inRange(currentIndex + 1, 0, maxLen.current - 1);
      setCurrentIndex(inRange(nextIndex));
    }

    setTransY(0);
    setIsDragging(false);

    if (currentIndex !== nextIndex) {
      console.log(currentIndex, "번 쇼츠 ", (new Date() - startTime) / 1000, "초 봤음");
      setStartTime(new Date());
      onIndexReceive(currentIndex); // 부모 컴포넌트로 현재 페이지 index 전달하기
    }

    window.removeEventListener("mousemove", handleMouseMove);
  };

  const handleTouchStart = (touchEvent) => {
    console.log("touch start");
    const carouselItems = carouselItemsRef.current;
    positionYRef.current = touchEvent.touches[0].pageY;

    setIsDragging(true);
    window.addEventListener("touchmove", handleTouchMove);
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

    if (deltaY < -150) {
      setCurrentIndex(inRange(currentIndex - 1, 0, maxLen.current - 1));
    }
    if (deltaY > 150) {
      setCurrentIndex(inRange(currentIndex + 1, 0, maxLen.current - 1));
    }

    setTransY(0);
    setIsDragging(false);

    window.removeEventListener("touchmove", handleTouchMove);
  };

  useEffect(() => {
    maxLen.current = shortList.length;
  }, [shortList.length]);

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
    if (carouselItemsRef.current)
      carouselItemsRef.current.style.transform = `translateY(${-(currentIndex * height + transY)}px)`;
  }, [transY]);

  return (
    <div className="overflow-hidden max-w-[450px]" style={{ height: `${height}px` }}>
      <div
        ref={carouselItemsRef}
        className="flex flex-col"
        style={{ transition: `transform ${transY ? 0 : 300}ms ease-in-out 0s` }}
      >
        <Shorts items={shortList} itemWidth={ITEM_WIDTH} itemHeight={height} />
      </div>
    </div>
  );
};

export default Carousel;
