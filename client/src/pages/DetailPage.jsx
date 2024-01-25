import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const DetailPage = () => {
  const location = useLocation();
  const { id } = location.state;
  return (
    <main className="h-[calc(100vh_-_64px)]">
      <h1 className="text-white">{id}번 작품 페이지</h1>
    </main>
  );
};

export default DetailPage;
