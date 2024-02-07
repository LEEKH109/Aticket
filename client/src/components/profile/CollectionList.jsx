import { useState, useEffect, useRef } from "react";
import CollectionItem from "./CollectionItem";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const HEIGHT = `h-[calc(100vh_-_2.5rem_-_128px_-_41px_-_64px)]`;

const CollectionList = () => {
  const [collectionList, setCollectionList] = useState();

  useEffect(() => {
    // 사용자의 컬렉션 리스트 받아오는 로직
  });

  return (
    <section className={`w-full ${HEIGHT} p-4 grid grid-cols-3 gap-4 overflow-y-scroll`}>
      <CollectionItem collection={"https://cdn.pixabay.com/photo/2023/07/04/08/31/cats-8105667_1280.jpg"} />
      <CollectionItem collection={"https://cdn.pixabay.com/photo/2024/01/07/11/17/welsh-corgi-8492879_1280.jpg"} />
      <CollectionItem collection={"https://cdn.pixabay.com/photo/2023/12/13/06/40/cat-8446390_1280.jpg"} />
      <CollectionItem collection={"https://cdn.pixabay.com/photo/2023/11/17/12/46/cat-8394224_1280.jpg"} />
      <CollectionItem collection={"https://cdn.pixabay.com/photo/2019/07/27/09/05/red-panda-4366264_1280.jpg"} />
      <CollectionItem collection={"https://cdn.pixabay.com/photo/2019/07/27/09/05/red-panda-4366264_1280.jpg"} />
      <CollectionItem collection={"https://cdn.pixabay.com/photo/2019/07/27/09/05/red-panda-4366264_1280.jpg"} />
    </section>
    // <section className={`w-full ${HEIGHT} p-4 flex flex-col gap-4 justify-center items-center`}>
    //   <div className="p-4 border-4 rounded-full">
    //     <BookmarkIcon fontSize="large" color="disabled" />
    //   </div>
    //   <p className="text-xl text-gray-400">저장한 미디어가 없습니다.</p>
    // </section>
  );
};

export default CollectionList;
