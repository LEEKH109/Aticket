import { useLocation } from "react-router-dom";

const BillingResultPage = () => {
  const location = useLocation();
  const { paymentInfo } = location.state || {}; // state가 없는 경우를 대비한 기본값 설정
  return (
    <div>
      <h2>결제 정보</h2>
      <pre>{JSON.stringify(paymentInfo, null, 2)}</pre>
    </div>
  );
};

export default BillingResultPage;
