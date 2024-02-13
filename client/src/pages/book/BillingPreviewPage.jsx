import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BillingPreviewPage = () => {
  const { state } = useLocation();
  const { tid, redirectUrlPc, redirectUrlMobile, selectedSeats, shortInfo } =
    state || {};

  useEffect(() => {}, []);

  const handlePaymentRedirect = () => {
    const targetUrl =
      window.innerWidth <= 600 ? redirectUrlMobile : redirectUrlPc;
    window.location.href = targetUrl;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-auto">
      <div className="w-full">
        <div className="flex gap-0 px-5">
          <ArrowBackIosIcon />
          <div>Aːticket</div>
        </div>
        <div className="flex gap-0 px-5 text-xs font-bold text-center text-white mb-4">
          <div className="justify-center px-6 py-2 whitespace-nowrap bg-black rounded-md border border-white border-solid ">
            1.
          </div>
          <div className="grow justify-center px-12 py-2 bg-black rounded-md border border-white border-solid">
            2. 결제 상세
          </div>
          <div className="justify-center px-6 py-2 whitespace-nowrap bg-black rounded-md border border-white border-solid ">
            3.
          </div>
        </div>
        <div className="p-4">
          <h1>결제 상세</h1>
          {shortInfo && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold">{shortInfo.title}</h2>
              <img
                src={shortInfo.posterUrl}
                alt="Event Poster"
                className="w-32 h-auto my-2"
              />
              <p>장소: {shortInfo.location}</p>
            </div>
          )}
          <p>Transaction ID: {tid}</p>
          <div>
            <h2>Selected Seats:</h2>
            <ul>
              {selectedSeats &&
                selectedSeats.map((seat, index) => (
                  <li key={index}>
                    좌석 번호: {seat.seatNumber}, 타입: {seat.type}, 가격:{" "}
                    {seat.price}원
                  </li>
                ))}
            </ul>
          </div>
          <p>
            총 금액: {selectedSeats.reduce((acc, seat) => acc + seat.price, 0)}
            원
          </p>
          <button
            onClick={handlePaymentRedirect}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingPreviewPage;
