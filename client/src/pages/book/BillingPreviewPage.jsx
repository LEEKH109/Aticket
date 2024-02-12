import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const BillingPreviewPage = () => {
  const { state } = useLocation();
  const { tid, redirectUrlPc, redirectUrlMobile } = state || {};
  const [buttonStyle, setButtonStyle] = useState({});

  useEffect(() => {
    const updateButtonStyle = () => {
      if (window.innerWidth <= 600) {
        // 모바일 화면 크기일 때의 버튼 스타일
        setButtonStyle({ backgroundColor: "blue", color: "white" });
      } else {
        // PC 화면 크기일 때의 버튼 스타일
        setButtonStyle({ backgroundColor: "green", color: "white" });
      }
    };

    // 컴포넌트 마운트 시 스타일 업데이트
    updateButtonStyle();

    // 화면 크기 변경 시 스타일 업데이트
    window.addEventListener("resize", updateButtonStyle);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("resize", updateButtonStyle);
  }, []);

  const handlePaymentRedirect = () => {
    const targetUrl =
      window.innerWidth <= 600 ? redirectUrlMobile : redirectUrlPc;
    window.location.href = targetUrl;
  };

  return (
    <div className="p-4">
      <h1>Billing Preview</h1>
      <p>Transaction ID: {tid}</p>
      <button style={buttonStyle} onClick={handlePaymentRedirect}>
        결제하기
      </button>
    </div>
  );
};

export default BillingPreviewPage;
