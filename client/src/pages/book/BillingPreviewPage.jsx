import React from "react";
import { useLocation } from "react-router-dom";

const BillingPreviewPage = () => {
  const { state } = useLocation();
  const { tid, redirectUrl } = state || {};

  const handlePaymentRedirect = () => {
    window.location.href = redirectUrl;
  };
  return (
    <div className="p-4">
      <h1>Billing Preview</h1>
      <p>Transaction ID: {tid}</p>
      <button onClick={handlePaymentRedirect}>결제하기</button>
    </div>
  );
};

export default BillingPreviewPage;
