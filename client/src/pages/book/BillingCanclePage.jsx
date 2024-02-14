import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BillingCancelPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      title: "결제가 취소되었습니다.",
      text: "결제 처리가 취소되었습니다. 메인 페이지로 이동합니다.",
      icon: "info",
      confirmButtonText: "확인",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  }, []);

  return <div>결제를 처리 중입니다...</div>;
};

export default BillingCancelPage;
