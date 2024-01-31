import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const DetailPage = () => {
  const location = useLocation();
  const { id } = location.state;
  return (
    <div>
      <main className="h-[calc(100vh_-_64px)]">
        <h1 className="text-white">{id}번 작품 페이지</h1>
      </main>
      원래는 작품 categoryId 넣어야 함
      <Chatpreview categoryId={categoryId} />
    </div>
  );
};

export default DetailPage;
