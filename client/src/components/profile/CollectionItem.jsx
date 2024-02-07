import { useState, useEffect } from "react";

const CollectionItem = ({ collection }) => {
  return (
    <div className="h-48">
      <img src={collection} className="h-full object-cover" />
    </div>
  );
};

export default CollectionItem;
