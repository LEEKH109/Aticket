import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BillingFailPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/short");
  }, []);

  return <div>결제를 처리 중입니다...</div>;
};

export default BillingFailPage;
