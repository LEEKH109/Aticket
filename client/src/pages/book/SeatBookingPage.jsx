import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { timetableApi } from "../../util/timetable-axios";
import { billingApi } from "../../util/billing-axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const Seat = ({ seatInfo, onSelect, isSelected }) => {
  const { seatNumber, status } = seatInfo;
  const isSelectable = status === "available";

  return (
    <button
      disabled={!isSelectable}
      className={`w-[30px] h-[30px] rounded-tl-[10px] rounded-tr-[10px] ${
        isSelected
          ? "bg-zinc-700"
          : isSelectable
          ? "bg-[#e06a4e]"
          : "bg-gray-400"
      } ${!isSelectable && "opacity-50 cursor-not-allowed"}`}
      onClick={() => onSelect(seatInfo)}
    >
      {seatNumber}
    </button>
  );
};

const Modal = ({ isOpen, onClose, selectedSeats }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">선택한 좌석 상세정보</h2>
            <ul>
              {selectedSeats.map((seat) => (
                <li key={seat.seatNumber}>
                  좌석 번호: {seat.seatNumber}, 타입: {seat.type}, 가격:{" "}
                  {seat.price}원
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-gray-200 px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const SeatBookingPage = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatLimit, setSeatLimit] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state } = useLocation();
  const { timetableId, artId, userId, shortInfo } = state || {};
  const navigate = useNavigate();

  const MAX_SEAT_LIMIT = 4;
  const DEFAULT_SEAT_PRICE = 0;

  useEffect(() => {
    const rows = ["A", "B", "C", "D", "E"];
    const cols = Array.from({ length: 8 }, (_, index) => index + 1);
    const initialSeats = rows.flatMap((row) =>
      cols.map((col) => ({
        seatNumber: `${row}${col}`,
        status: "unavailable",
        type: "standard",
        price: DEFAULT_SEAT_PRICE,
      }))
    );
    timetableApi
      .getSeats(timetableId)
      .then((response) => {
        const serverResponseSeats = response.data.seatInfo;
        const updatedSeats = initialSeats.map((seat) => {
          const serverSeat = serverResponseSeats.find(
            (s) => s.seatNumber === seat.seatNumber
          );
          return serverSeat
            ? {
                ...seat,
                status:
                  serverSeat.status === "예약가능"
                    ? "available"
                    : "unavailable",
                type: serverSeat.type,
                price: serverSeat.price,
              }
            : seat;
        });

        setSeats(updatedSeats);
      })
      .catch((error) => {
        console.error("유효하지 않은 접근입니다.", error);
        navigate("/");
      });
  }, [timetableId]);

  const handleSelectSeat = (seatInfo) => {
    const { seatNumber, type, price } = seatInfo;

    if (selectedSeats.some((seat) => seat.seatNumber === seatNumber)) {
      const newSelectedSeats = selectedSeats.filter(
        (seat) => seat.seatNumber !== seatNumber
      );
      setSelectedSeats(newSelectedSeats);
      setTotalPrice(
        newSelectedSeats.reduce((acc, curr) => acc + curr.price, 0)
      );
    } else if (selectedSeats.length < seatLimit) {
      const newSelectedSeats = [
        ...selectedSeats,
        { seatNumber, type, price },
      ].sort((a, b) => a.seatNumber.localeCompare(b.seatNumber));
      setSelectedSeats(newSelectedSeats);
      setTotalPrice(
        newSelectedSeats.reduce((acc, curr) => acc + curr.price, 0)
      );
    } else {
      Swal.fire({
        title: "좌석 선택 제한 초과!",
        text: `최대 ${seatLimit}개의 좌석만 선택할 수 있습니다.`,
        icon: "warning",
        confirmButtonText: "확인",
      });
    }
  };

  const adjustSeatLimit = (adjustment) => {
    const newLimit = seatLimit + adjustment;
    if (newLimit >= 1 && newLimit <= MAX_SEAT_LIMIT) {
      setSeatLimit(newLimit);
      setSelectedSeats([]);
      setTotalPrice(0);
    }
  };

  const preparePayment = () => {
    const seats = selectedSeats.map((seat) => ({
      timetableId,
      seatNumber: seat.seatNumber,
    }));

    billingApi
      .submitReservationForSeat(userId, artId, seats)
      .then((response) => {
        navigate("/billing/preview", {
          state: { ...response.data, selectedSeats, shortInfo },
        });
        console.log("결제 준비 응답:", response.data);
      })
      .catch((error) => {
        console.error("결제 준비 실패:", error);
        Swal.fire({
          title: "결제 준비 실패",
          text: "서버에서 결제 준비를 진행하지 못했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      });
  };

  const openModal = () => {
    setShowDetails(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setShowDetails(false);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-[calc(100svh-64px)] overflow-auto">
      <div className="w-full">
        <div className="flex gap-0 px-5">
          <ArrowBackIosIcon />
          <div>Aːticket</div>
        </div>
        <div className="flex gap-0 px-5 text-xs font-bold text-center text-white mb-4">
          <div className="grow justify-center px-12 py-2 bg-black rounded-md border border-white border-solid">
            1. 좌석 선택
          </div>
          <div className="justify-center px-6 py-2 whitespace-nowrap bg-black rounded-md border border-white border-solid ">
            2.
          </div>
          <div className="justify-center px-6 py-2 whitespace-nowrap bg-black rounded-md border border-white border-solid ">
            3.
          </div>
        </div>

        <div className="w-[370px] mx-auto p-4 bg-gray-200 rounded-lg ">
          <div className="flex gap-0 px-5 text-xs font-bold text-center text-white mb-4">
            <svg
              width="350"
              height="60"
              viewBox="0 0 350 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: "0 auto" }}
            >
              <path
                d="M6 34C120 4 230 4 344 34"
                stroke="black"
                strokeWidth="8"
                strokeLinecap="square"
              />
            </svg>
          </div>
          <div className="grid grid-cols-8 gap-2 mb-10">
            {seats.map((seat) => (
              <Seat
                key={seat.seatNumber}
                seatInfo={seat}
                onSelect={handleSelectSeat}
                isSelected={selectedSeats.some(
                  (selectedSeat) => selectedSeat.seatNumber === seat.seatNumber
                )}
              />
            ))}
          </div>
        </div>
        <div className=" mx-auto p-4">
          <div className="flex gap-5 justify-between px-5 mb-4 text-sm font-bold text-black whitespace-nowrap">
            <div className="flex gap-1.5 justify-between">
              <div className="w-5 h-5 rounded-full bg-zinc-300" />
              <div className="grow my-auto">예약 완료 </div>
            </div>
            <div className="flex gap-1.5 justify-between">
              <div className="w-5 h-5 rounded-full bg-[#e06a4e]" />
              <div className="grow my-auto">예약 가능</div>
            </div>
            <div className="flex gap-1.5 justify-between">
              <div className="w-5 h-5 bg-zinc-700 rounded-full" />
              <div className="grow my-auto">선택한 좌석</div>
            </div>
          </div>
          <div className="flex flex-col items-start px-5 text-[14px] font-black text-black">
            <div className="w-full mb-2 bg-black min-h-[1px]" />
          </div>
          <div className="flex items-center ml-auto px-4">
            <div className="ml-2 mr-auto font-semibold">인원</div>
            <IconButton onClick={() => adjustSeatLimit(-1)}>
              <RemoveIcon />
            </IconButton>
            <span className="mx-2">{seatLimit}</span>
            <IconButton onClick={() => adjustSeatLimit(1)}>
              <AddIcon />
            </IconButton>
          </div>

          <div className="flex px-6 pb-2 text-[14px]">
            <div className="flex items-center gap-2">
              <InfoOutlined />
              <div>1회에 최대 4인까지 예매 가능합니다.</div>
            </div>
          </div>
          <div className="flex flex-col items-start px-5 text-base text-black">
            <div className="w-full mb-3 bg-black min-h-[1px]" />
            <div className="mb-2">
              선택된 좌석:{" "}
              {selectedSeats.map((seat) => seat.seatNumber).join(", ") || "-"}
            </div>
            <button
              onClick={openModal}
              className={`text-xs font-bold text-white bg-black border border-black rounded-lg px-2 py-1 ${
                selectedSeats.length === 0 || isModalOpen
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={selectedSeats.length === 0 || isModalOpen}
            >
              상세 보기
            </button>

            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              selectedSeats={selectedSeats}
            />
          </div>
          <div className="px-5 text-2xl font-semibold text-right">
            <div>{Intl.NumberFormat("ko-KR").format(totalPrice)}원</div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            onClick={preparePayment}
            className={`text-lg font-bold text-white bg-black border border-black rounded-t-lg py-2 ${
              selectedSeats.length < seatLimit
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            style={{ width: "320px" }}
            disabled={selectedSeats.length < seatLimit}
          >
            예매하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatBookingPage;
