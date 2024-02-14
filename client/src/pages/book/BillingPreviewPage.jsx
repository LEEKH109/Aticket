import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import KakaoIcon from "../../components/KakaoIcon";

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
    <div className="flex flex-col h-[calc(100svh-64px)] overflow-auto">
      <div className="flex flex-col w-full h-full">
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
          <>
            <img
              src={shortInfo?.posterUrl}
              alt="Event Poster"
              className="w-32 h-auto mx-auto"
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
            <div className="w-full mt-4 border-t pt-2">
              <div className="flex justify-between">
                <span className="text-xs font-bold">총 금액 / 매수:</span>
                <span className="text-xs">
                  {(totalPrice || 0).toLocaleString()}원 /{" "}
                  {selectedTickets.reduce(
                    (acc, ticket) => acc + ticket.count,
                    0
                  )}
                  매
                </span>
              </div>
            </div>
          </>
        )}

        <Button
          onClick={handlePaymentRedirect}
          variant="contained"
          sx={{
            width: "100%",
            height: "4.8vh",
            position: "relative",
            marginTop: "3vh",
            backgroundColor: "#FEE500",
            ":hover": {
              backgroundColor: "#FDD835",
            },
            color: "#000",
          }}
          startIcon={<KakaoIcon />}
        >
          카카오페이로 결제하기
        </Button>
      </div>
    </div>
  );
};

export default BillingPreviewPage;
