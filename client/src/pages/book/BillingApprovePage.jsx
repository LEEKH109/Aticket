import React, { useEffect } from "react";
import { billingApi } from "../../util/billing-axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const BillingApprovePage = () => {
  const { reservationId } = useParams();
  const [searchParams] = useSearchParams();
  const pgToken = searchParams.get("pg_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (reservationId && pgToken) {
      billingApi
        .approvePayment(reservationId, pgToken)
        .then((response) => {
          navigate("/billing/result", {
            state: { paymentInfo: response.data },
          });
        })
        .catch((error) => {
          console.error("결제 승인 실패:", error);
        });
    }
  }, [reservationId, pgToken, navigate]);

  return <div>결제를 처리 중입니다...</div>;
};

export default BillingApprovePage;
