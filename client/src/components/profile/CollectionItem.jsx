import { Link } from "react-router-dom";

const CollectionItem = ({ collection, index }) => {
  return (
    <Link to={`/collection?index=${index}`} className="block relative h-48 bg-black">
      {collection.type == "VIDEO" ? (
        <video className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-cover">
          <source src={collection.mediaUrl} type="video/mp4" />
        </video>
      ) : (
        <img
          src={collection.mediaUrl}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-cover"
        />
      )}
    </Link>
  );
};

export default CollectionItem;
