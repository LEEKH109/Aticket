import { useEffect, useRef, useState } from "react";
import Shorts from "../components/Shorts";

const ITEM_WIDTH = 412;
const ITEM_HEIGHT = Math.round(window.innerHeight) - 64;
// const ITEM_HEIGHT = 639;

const Carousel = ({ shortList }) => {
  const carouselItemsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [transY, setTransY] = useState(0);

  // 범위 안의 값을 반환하는 함수
  const inRange = (value, min, max) => {
    if (value < min) {
      return min;
    }

    if (value > max) {
      return max;
    }

    return value;
  };

  // 마우스를 눌렀을 때 실행될 함수
  const handleMouseDown = (clickEvent) => {
    clickEvent.preventDefault();
    const carouselItems = carouselItemsRef.current;

    setIsDragging(true);

    const handleMouseMove = (moveEvent) => {
      // 클릭 시작점의 y좌표에서 움직인 위치의 y좌표를 빼면 총 움직인 거리가 됨
      // deltaY가 음수라면 위에서 아래로 드래그, 양수면 아래에서 위로 드래그
      const deltaY = clickEvent.pageY - moveEvent.pageY;

      // 드래그 도중 영역을 벗어나면 드래그 취소
      if (moveEvent.clientY > ITEM_HEIGHT || moveEvent.clientY < 0) {
        window.removeEventListener("mousemove", handleMouseMove);
        setTransY(0);
        setIsDragging(false);
        return;
      }

      // 한 번의 드래그로 화면 이상을 가지 못하도록 값 수정
      setTransY(inRange(deltaY, -ITEM_HEIGHT, ITEM_HEIGHT));
    };

    // 사용자가 드래그를 마치고 마우스를 뗄 때
    const handleMouseUp = (moveEvent) => {
      const deltaY = clickEvent.pageY - moveEvent.pageY;

      // 사용자가 끝까지 움직이지 않아도 carousel이 이동하기 위해 리스트의 인덱스 조정
      if (deltaY < -150) {
        setCurrentIndex(inRange(currentIndex - 1, 0, shortList.length - 1));
      }
      if (deltaY > 150) {
        setCurrentIndex(inRange(currentIndex + 1, 0, shortList.length - 1));
      }

      // 드래그가 끝났으므로 이동 거리는 0으로 리셋ㄴ
      setTransY(0);
      setIsDragging(false);

      window.removeEventListener("mousemove", handleMouseMove);
    };

    window.addEventListener("mousemove", handleMouseMove);
    carouselItems?.addEventListener("mouseup", handleMouseUp, { once: true });
  };

  useEffect(() => {
    const carouselItems = carouselItemsRef.current;

    carouselItems?.addEventListener("mousedown", handleMouseDown);

    return () => {
      carouselItems?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isDragging]);

  // 드래그 동안에도 carousel은 움직여야 함
  useEffect(() => {
    if (carouselItemsRef.current)
      carouselItemsRef.current.style.transform = `translateY(${-(currentIndex * ITEM_HEIGHT + transY)}px)`;
  }, [transY]);

  return (
    <div className="overflow-hidden max-w-[450px]" style={{ height: `${ITEM_HEIGHT}px` }}>
      <div
        ref={carouselItemsRef}
        className="flex flex-col"
        style={{ transition: `transform ${transY ? 0 : 300}ms ease-in-out 0s` }}
      >
        <Shorts items={shortList} itemWidth={ITEM_WIDTH} itemHeight={ITEM_HEIGHT} />
      </div>
    </div>
  );
};

export default Carousel;
