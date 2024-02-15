import Shorts from "./Shorts";

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
          nowPlaying={currentIndex == index}
        />
      ))}
    </>
  );
};

export default ShortsList;
