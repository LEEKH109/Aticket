import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const BillingPreviewPage = () => {
  const { state } = useLocation();
  const {
    redirectUrlPc,
    redirectUrlMobile,
    selectedSeats,
    shortInfo,
    selectedTickets,
    ticketTypes,
    totalPrice,
  } = state || {};

  useEffect(() => {}, []);

  const handlePaymentRedirect = () => {
    const targetUrl =
      window.innerWidth <= 600 ? redirectUrlMobile : redirectUrlPc;
    window.location.href = targetUrl;
  };

  const showInfo = shortInfo !== undefined;
  const showTickets = selectedTickets !== undefined && totalPrice !== undefined;
  const showSelectedSeats = selectedSeats !== undefined;

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
        {showInfo && (
          <div className="flex flex-col items-center px-5 text-black max-w-[310px] mt-5">
            {shortInfo.posterUrl && (
              <img
                src={shortInfo.posterUrl}
                alt="Event Poster"
                className="mx-auto max-w-[150px] max-h-[200px] object-cover"
              />
            )}
            <div className="mt-4 text-xl font-black text-center">
              {shortInfo.title || "제목 정보 없음"}
            </div>
            <div className="mt-2 text-sm">{`관람일시: ${
              shortInfo.date || "-"
            }`}</div>
            <div className="text-sm">{`장소: ${
              shortInfo.location || "-"
            }`}</div>
          </div>
        )}

        {showSelectedSeats && (
          <div className="mt-5 px-5">
            <h2 className="text-xl font-bold">Selected Seats</h2>
            <ul className="mt-2">
              {selectedSeats.map((seat, index) => (
                <li key={index} className="mt-1">
                  좌석 번호: {seat.seatNumber}, 타입: {seat.type}, 가격:{" "}
                  {(seat.price || 0).toLocaleString()}원
                </li>
              ))}
            </ul>
          </div>
        )}

        {showTickets && (
          <div className="mt-5 px-5">
            <h2 className="text-xl font-bold">Selected Tickets</h2>
            {selectedTickets.map((ticket, index) => (
              <div key={index} className="mt-2 flex justify-between">
                <span className="text-sm font-bold">{ticket.userType}</span>
                <span className="text-sm">{`${(
                  ticket.price || 0
                ).toLocaleString()}원 x ${ticket.count}매`}</span>
              </div>
            ))}
            <div className="mt-4 flex justify-between border-t pt-2">
              <span className="text-sm font-bold">총 금액 / 매수</span>
              <span className="text-sm">{`${(
                totalPrice || 0
              ).toLocaleString()}원 / ${selectedTickets.reduce(
                (acc, ticket) => acc + ticket.count,
                0
              )}매`}</span>
            </div>
          </div>
        )}
        <button
          onClick={handlePaymentRedirect}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default BillingPreviewPage;
