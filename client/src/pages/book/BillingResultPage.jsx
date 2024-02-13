import { useLocation } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const BillingResultPage = () => {
  const location = useLocation();
  const { paymentInfo } = location.state || {};

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
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
          <div className="justify-center px-6 py-2 whitespace-nowrap bg-black rounded-md border border-white border-solid ">
            2.
          </div>
          <div className="grow justify-center px-12 py-2 bg-black rounded-md border border-white border-solid">
            3. 결제 완료
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-lg font-semibold">{paymentInfo?.message}</div>
          <div className="mt-4">
            <div className="text-xs font-bold">주문 번호:</div>
            <div className="text-sm">{paymentInfo?.partnerOrderId}</div>
          </div>
          <div className="mt-2">
            <div className="text-xs font-bold">상품명:</div>
            <div className="text-sm">{paymentInfo?.itemName}</div>
          </div>
          <div className="mt-2">
            <div className="text-xs font-bold">승인 시각:</div>
            <div className="text-sm">{formatDate(paymentInfo?.approvedAt)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingResultPage;
