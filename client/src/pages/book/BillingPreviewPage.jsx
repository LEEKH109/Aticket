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

  const totalSeatsPrice =
    selectedSeats?.reduce((acc, seat) => acc + seat.price, 0) || 0;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-auto">
      {showInfo && (
        <>
          <img
            src={shortInfo?.posterUrl}
            alt="Event Poster"
            className="w-32 h-auto mx-auto" // 포스터 이미지 사이즈 조정 및 중앙 정렬
          />
          <div className="w-full text-xl font-black mt-4">결제 정보</div>
          <div className="flex flex-col w-full mt-2.5">
            <div className="border-t border-b border-black">
              <div className="flex justify-between items-center py-3">
                <div className="text-xs font-black">공연명</div>
                <div className="text-xs font-black text-right">
                  {shortInfo?.title || "-"}
                </div>
              </div>
              <div className="flex justify-between items-center py-3">
                <div className="text-xs font-black">관람일시</div>
                <div className="text-xs font-semibold text-right">
                  {shortInfo?.date || "-"}
                </div>
              </div>
              <div className="flex justify-between items-center py-3">
                <div className="text-xs font-black">장소</div>
                <div className="text-xs font-semibold text-right">
                  {shortInfo?.location || "-"}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showSelectedSeats && (
        <div className="w-full mt-4">
          <div className="text-xl font-black">선택된 좌석</div>
          {selectedSeats.map((seat, index) => (
            <div key={index} className="mt-2">
              <span className="text-xs font-bold">좌석 번호:</span>
              <span className="text-xs font-bold">{seat.seatNumber},</span>

              <span className="text-xs font-bold"> 타입:</span>
              <span className="text-xs font-bold">{seat.type},</span>

              <span className="text-xs font-bold"> 가격:</span>
              <span className="text-xs font-bold">
                {(seat.price || 0).toLocaleString()}원
              </span>
            </div>
          ))}
          <div className="mt-2 font-semibold">
            선택된 좌석의 총 가격: {totalSeatsPrice.toLocaleString()}원
          </div>
        </div>
      )}

      {showTickets && (
        <>
          <div className="w-full mt-4">
            <div className="text-xl font-black">티켓 선택</div>
            {selectedTickets.map((ticket, index) => (
              <div key={index} className="mt-2 flex justify-between">
                <span className="text-xs font-bold">{ticket.userType}:</span>
                <span className="text-xs ">
                  {(ticket.price || 0).toLocaleString()}원 x {ticket.count}매
                </span>
              </div>
            ))}
          </div>
          <div className="w-full mt-4 border-t pt-2">
            <div className="flex justify-between">
              <span className="text-xs font-bold">총 금액 / 매수:</span>
              <span className="text-xs">
                {(totalPrice || 0).toLocaleString()}원 /{" "}
                {selectedTickets.reduce((acc, ticket) => acc + ticket.count, 0)}
                매
              </span>
            </div>
          </div>
        </>
      )}

      <button
        onClick={handlePaymentRedirect}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        결제하기
      </button>
    </div>
  );
};

export default BillingPreviewPage;
