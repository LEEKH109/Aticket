import { Link } from "react-router-dom";

const CollectionItem = ({ collection, index }) => {
  return (
    <Link to={`/collection?index=${index}`} className="h-48">
      {collection.type == "VIDEO" ? (
        <video className="w-full h-full object-cover">
          <source src={collection.mediaUrl} type="video/mp4" />
        </video>
      ) : (
        <img src={collection.mediaUrl} />
      )}
    </Link>
  );
};

export default CollectionItem;
