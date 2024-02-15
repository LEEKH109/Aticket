import Shorts from "./Shorts";

// const ITEM_HEIGHT = Math.round(window.innerHeight) - 64;

const ShortsList = ({ viewDetailLog, closeDetail, shortsIdList, itemHeight, currentIndex }) => {
  return (
    <>
      {shortsIdList.map((shortsId, index) => (
        <Shorts
          key={shortsId}
          shortsId={shortsId}
          itemHeight={itemHeight}
          viewDetailLog={viewDetailLog}
          closeDetail={closeDetail}
          isRendering={currentIndex - 1 == index || currentIndex == index || currentIndex + 1 == index}
        />
      ))}
    </>
  );
};

export default ShortsList;
