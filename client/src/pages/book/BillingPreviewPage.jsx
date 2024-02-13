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

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-auto">
      <div className="w-full">
        <div className="flex gap-0 px-5">
          <ArrowBackIosIcon />
          <div>Aːticket</div>
        </div>
        {showInfo && (
          <div className="flex flex-col px-5 text-black max-w-[310px]">
            <div className="w-full text-xl font-black">결제 정보</div>
            <div className="flex gap-5 justify-between px-3.5 pt-4 pb-3 mt-2.5 w-full border-t border-b border-solid bg-white bg-opacity-0 border-y-black">
              <div className="flex flex-col self-start text-xs font-black whitespace-nowrap">
                <div>공연명</div>
                <div className="mt-5">관람일시</div>
                <div className="mt-5">장소</div>
              </div>
              <div className="flex flex-col text-sm text-right">
                <div className="flex flex-col pl-14">
                  <div className="font-black">{shortInfo?.title || "-"}</div>
                  <div className="mt-5 font-semibold">
                    {shortInfo?.date || "-"}
                  </div>
                </div>
                <div className="mt-5 font-semibold">
                  {shortInfo?.location || "-"}
                </div>
              </div>
            </div>
            {showTickets &&
              selectedTickets.map((ticket, index) => (
                <div
                  key={index}
                  className="flex gap-5 justify-between px-3.5 pt-4 pb-2 w-full border-b border-solid bg-white bg-opacity-0 border-b-black"
                >
                  <div className="text-xs font-black">{ticket.userType}</div>
                  <div className="flex gap-5 justify-between text-sm font-semibold text-right">
                    <div>{(ticket.price || 0).toLocaleString()} 원</div>
                    <div>{ticket.count} 매</div>
                  </div>
                </div>
              ))}
            {showTickets && (
              <div className="flex gap-5 justify-between p-3.5 w-full border-b border-solid bg-white bg-opacity-0 border-b-black">
                <div className="text-xs font-black">총 금액 / 매수</div>
                <div className="flex gap-5 justify-between text-sm font-semibold text-right">
                  <div>{(totalPrice || 0).toLocaleString()} 원</div>
                  <div>
                    {selectedTickets.reduce(
                      (acc, ticket) => acc + ticket.count,
                      0
                    )}{" "}
                    매
                  </div>
                </div>
              </div>
            )}
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
