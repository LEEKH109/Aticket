import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const BillingResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentInfo } = location.state || {};

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
        <div className="mt-10 text-center">
          <CheckCircleOutlineIcon style={{ fontSize: 40 }} />
          <div className="text-lg font-semibold">{paymentInfo?.message}</div>
          <div className="mt-4">
            <div className="text-xs font-bold">주문 번호:</div>
            <div className="text-sm">{paymentInfo?.partnerOrderId}</div>
          </div>
          <div className="mt-2">
            <div className="text-xs font-bold">상품명:</div>
            <div className="text-sm">{paymentInfo?.itemName}</div>
          </div>
        </div>
        <div>
          <div
            className="mt-5 mx-auto flex gap-0 px-6 py-3 text-2xl font-black text-center text-black whitespace-nowrap bg-white rounded-xl border-2 border-black border-solid cursor-pointer"
            onClick={() => navigate("/")}
            style={{ width: "fit-content" }}
          >
            숏츠로 이동
          </div>
          <div
            className="mt-5 mx-auto flex gap-0 px-6 py-3 text-2xl font-black text-center text-black whitespace-nowrap bg-white rounded-xl border-2 border-black border-solid cursor-pointer"
            onClick={() => navigate("/user")}
            style={{ width: "fit-content" }}
          >
            마이페이지로 이동
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingResultPage;
