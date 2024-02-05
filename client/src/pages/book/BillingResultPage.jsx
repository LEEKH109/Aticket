import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BillingResultPage = () => {
  const [paymentInfo, setPaymentInfo] = useState({});
  const location = useLocation();

  useEffect(() => {
    // URL 쿼리 파라미터 추출
    const searchParams = new URLSearchParams(location.search);
    const pgToken = searchParams.get("pgToken");
    const reservationId = searchParams.get("reservationId");

    // 서버에 결제 정보 요청하는 로직 구현 (예시)
    // fetchPaymentInfo는 서버에 결제 정보를 요청하는 함수이며, 여기서는 가정으로 사용됨
    fetchPaymentInfo(pgToken, reservationId).then((data) => {
      setPaymentInfo(data);
    });
  }, [location]);

  // fetchPaymentInfo 함수는 서버로부터 결제 정보를 가져오는 예시 함수입니다.
  // 실제로는 서버의 API 엔드포인트와 요청 방식에 맞게 구현해야 합니다.
  async function fetchPaymentInfo(pgToken, reservationId) {
    // 예시: 서버에 결제 정보 요청
    const response = await fetch(
      `서버의 결제 정보 요청 API 엔드포인트?pgToken=${pgToken}&reservationId=${reservationId}`
    );
    const data = await response.json();
    return data;
  }

  return (
    <div>
      <h2>결제 정보</h2>
      <pre>{JSON.stringify(paymentInfo, null, 2)}</pre>
    </div>
  );
};

export default BillingResultPage;
