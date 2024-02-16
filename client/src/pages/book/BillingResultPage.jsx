import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { billingApi } from "../../util/billing-axios";
import ticketsample from "../../assets/ticketsample.png";

const BillingResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentInfo } = location.state || {};
  const [reservationInfo, setReservationInfo] = useState(null);

  useEffect(() => {
    if (paymentInfo?.partnerOrderId) {
      billingApi
        .retrieveTicketReservationInfo(paymentInfo.partnerOrderId)
        .then((response) => {
          setReservationInfo(response.data[0]);
        })
        .catch((error) => {
          console.error("예매 정보 조회 실패:", error);
        });
    }
  }, [paymentInfo]);

  const handleBackClick = () => navigate(-1);

  // 티켓 정보 컴포넌트
  const TicketInfoComponent = ({ ticket }) => (
    <div className="flex overflow-hidden relative flex-col pt-6 pb-12 text-black aspect-[0.65] max-w-[300px]">
      <img
        loading="lazy"
        src={ticketsample}
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 p-4 text-black">
        <div className="text-xl font-black text-center">예매 내역</div>
        <div className="mt-4">공연명: {ticket.title}</div>
        <div className="mt-2">관람일시: {ticket.viewingDateTime}</div>
        <div className="mt-2">장소: {ticket.location}</div>
        <div className="mt-2">결제번호: {ticket.reservationId}</div>
        <div className="mt-2">총 금액: {ticket.totalAmount} 원</div>
        <div className="mt-2">매수: {ticket.totalCount} 매</div>
      </div>
    </div>
  );

  // 좌석 정보 컴포넌트
  const SeatInfoComponent = ({ seat }) => (
    <div className="flex overflow-hidden relative flex-col pt-6 pb-12 text-black aspect-[0.65] max-w-[300px]">
      <img
        loading="lazy"
        src={ticketsample}
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 p-4 text-black">
        <div className="text-xl font-black text-center">예매 내역</div>
        <div className="mt-4">공연명: {seat.title}</div>
        <div className="mt-2">관람일시: {seat.viewingDateTime}</div>
        <div className="mt-2">장소: {seat.location}</div>
        <div className="mt-2">좌석: {seat.reservedSeats}</div>
        <div className="mt-2">총 금액: {seat.totalAmount} 원</div>
        <div className="mt-2">매수: {seat.totalCount} 매</div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100svh-64px)] overflow-auto">
      <div className="w-full">
        <div
          className="flex items-center gap-2 px-5 cursor-pointer"
          onClick={handleBackClick}
        >
          <ArrowBackIosIcon />
          <div>Aːticket</div>
        </div>
        <div className="flex gap-0 px-5 text-xs font-bold text-center text-white mb-4">
          <div className="justify-center px-6 py-2 whitespace-nowrap bg-black rounded-md border border-white border-solid ">
            1.
          </div>
          <div className="justify-center px-6 py-2 whitespace-nowrap bg-black rounded-md border border-white border-solid ">
            2.
          </div>
          <div className="grow justify-center px-12 py-2 bg-black rounded-md border border-white border-solid">
            3. 결제 완료
          </div>
        </div>
        <div className="flex flex-col items-center">
          <CheckCircleOutlineIcon />
          <div>정상 결제 되었습니다.</div>
          {reservationInfo &&
            (reservationInfo.hasOwnProperty("ticketType") ? (
              <TicketInfoComponent ticket={reservationInfo} />
            ) : (
              <SeatInfoComponent seat={reservationInfo} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BillingResultPage;
