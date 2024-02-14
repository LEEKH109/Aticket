import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { billingApi } from "../../util/billing-axios";
import ticketsample from "../../assets/ticketsample.png";

const BillingResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentInfo } = location.state || {};
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (paymentInfo?.partnerOrderId) {
      billingApi
        .retrieveTicketReservationInfo(paymentInfo.partnerOrderId)
        .then((response) => {
          // 성공적으로 데이터를 받아온 경우, response.data를 사용하여 상태를 업데이트합니다.
          // response 구조에 따라 적절히 접근해야 합니다. 예제에서는 첫 번째 데이터를 사용합니다.
          setTicket(response.data[0]); // 예시 응답이 배열인 경우
        })
        .catch((error) => {
          // 에러 처리 로직
          console.error("예매 정보 조회 실패:", error);
        });
    }
  }, [paymentInfo]);

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  // ticketType이 있는지 확인하여 타입 결정
  const isTicketType = ticket && ticket.hasOwnProperty("ticketType");

  // 좌석 정보를 표시하는 함수
  const renderSeatInfo = () => {
    if (!ticket) return null; // ticket 정보가 없는 경우 렌더링하지 않음

    if (isTicketType) {
      // ticketType인 경우
      return Object.entries(ticket.ticketType).map(([key, value]) => (
        <div
          key={key}
          className="flex gap-5 justify-between text-sm font-semibold text-right"
        >
          <div>{key}석</div>
          <div>{value} 매</div>
        </div>
      ));
    } else if (ticket.hasOwnProperty("seatTypes")) {
      // seatTypes인 경우
      return Object.entries(ticket.seatTypes).map(([key, value]) => (
        <div
          key={key}
          className="flex gap-5 justify-between text-sm font-semibold text-right"
        >
          <div>{key}</div>
          <div>{value} 매</div>
        </div>
      ));
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-auto">
      <div className="w-full">
        <div
          className="flex items-center gap-2 px-5 cursor-pointer"
          onClick={handleBackClick}
        >
          <ArrowBackIosIcon />
          <div>Aːticket</div>
        </div>
        <div className="flex gap-2 px-5 text-xs font-bold text-center text-white my-4">
          {/* 진행 상태 표시, 실제 로직에 따라 내용을 수정할 수 있습니다. */}
          <div className="justify-center px-6 py-2 whitespace-nowrap bg-black rounded-md border border-white border-solid">
            1.
          </div>
          <div className="justify-center px-6 py-2 whitespace-nowrap bg-black rounded-md border border-white border-solid">
            2.
          </div>
          <div className="grow justify-center px-12 py-2 bg-black rounded-md border border-white border-solid">
            3. 결제 완료
          </div>
        </div>
        <div className="mt-10 text-center">
          <div className="mt-4">
            <div className="text-xs font-bold">주문 번호:</div>
            <div className="text-sm">{paymentInfo?.partnerOrderId}</div>
          </div>
          {ticket && (
            <>
              <img
                src={ticketsample}
                alt="공연 포스터"
                className="w-full max-w-xs mx-auto mt-4"
              />
              <div className="mt-4 text-xs font-bold">공연명:</div>
              <div className="text-sm">{ticket.title}</div>
              <div className="mt-4 text-xs font-bold">관람일시:</div>
              <div className="text-sm">{ticket.viewingDateTime}</div>
              <div className="mt-4 text-xs font-bold">장소:</div>
              <div className="text-sm">{ticket.location}</div>
              {renderSeatInfo()}
              <div className="mt-4 text-xs font-bold">총 금액 / 매수:</div>
              <div className="text-sm">
                {ticket.totalAmount.toLocaleString()} 원 / {ticket.totalCount}{" "}
                매
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingResultPage;
