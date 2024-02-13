import { useState, useEffect, useRef, useContext } from "react";
import CollectionItem from "./CollectionItem";
import { UserApi } from "../../util/user-axios";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const HEIGHT = `h-[calc(100svh_-_1rem_-_128px_-_41px_-_64px)]`;

const CollectionList = () => {
  const [collectionList, setCollectionList] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    UserApi.getCollections()
      .then(({ data }) => {
        setCollectionList(data.data);
        setIsLoading(true);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {isLoading ? (
        collectionList.length > 0 ? (
          <section className={`w-full ${HEIGHT} p-4 grid grid-cols-3 gap-4 overflow-y-scroll`}>
            {collectionList.map((collection, index) => (
              <CollectionItem key={collection.shortsId} collection={collection} index={index} />
            ))}
          </section>
        ) : (
          <section className={`${HEIGHT} flex flex-col justify-center items-center gap-6`}>
            <div className="p-4 rounded-full border-2 border-gray-300">
              <BookmarkAddIcon color="disabled" fontSize="large" />
            </div>
            <p className="text-gray-400">저장한 미디어가 없습니다.</p>
          </section>
        )
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default CollectionList;
