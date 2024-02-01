import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Seat = ({ seatInfo, onSelect, isSelected }) => {
  const { seatNumber, status } = seatInfo;
  const isSelectable = status === "available";

  return (
    <button
      disabled={!isSelectable}
      className={`w-[30px] h-[30px] rounded-tl-[10px] rounded-tr-[10px] ${
        isSelected
          ? "bg-[#353b44]"
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
const serverResponse = {
  artId: 1,
  category: "concert",
  date: "2024-02-15",
  seatInfo: [
    {
      timetableId: 1,
      seatNumber: "A1",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 2,
      seatNumber: "A2",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 3,
      seatNumber: "A3",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 4,
      seatNumber: "A4",
      status: "selected",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 5,
      seatNumber: "A5",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 6,
      seatNumber: "A6",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 7,
      seatNumber: "A7",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 8,
      seatNumber: "A8",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 9,
      seatNumber: "B1",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 10,
      seatNumber: "B2",
      status: "selected",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 11,
      seatNumber: "B3",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 12,
      seatNumber: "B4",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 13,
      seatNumber: "B5",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 14,
      seatNumber: "B6",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 15,
      seatNumber: "B7",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 16,
      seatNumber: "B8",
      status: "selected",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 17,
      seatNumber: "C1",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 18,
      seatNumber: "C2",
      status: "selected",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 19,
      seatNumber: "C3",
      status: "available",
      type: "standard",
      price: 50000,
    },
    {
      timetableId: 20,
      seatNumber: "C4",
      status: "selected",
      type: "standard",
      price: 50000,
    },
  ],
};

const SeatBookingPage = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatLimit, setSeatLimit] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

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

    const serverResponseSeats = serverResponse.seatInfo;
    const updatedSeats = initialSeats.map((seat) => {
      const serverSeat = serverResponseSeats.find(
        (s) => s.seatNumber === seat.seatNumber
      );
      return serverSeat ? { ...seat, status: serverSeat.status } : seat;
    });

    setSeats(updatedSeats);
  }, []);

  const handleSelectSeat = (seatInfo) => {
    const { seatNumber, type, price } = seatInfo;

    if (selectedSeats.some((seat) => seat.seatNumber === seatNumber)) {
      // 이미 선택된 좌석을 다시 선택하는 경우, 선택을 취소합니다.
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

  return (
    <div className="w-[375px] mx-auto p-4">
      <div className="grid grid-cols-8 gap-2 mb-4">
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
      <div className="mb-4 flex justify-center items-center">
        <button onClick={() => adjustSeatLimit(-1)}>-</button>
        <span className="mx-2">{seatLimit}</span>
        <button onClick={() => adjustSeatLimit(1)}>+</button>
      </div>
      <div>
        Selected seats:{" "}
        {selectedSeats.map((seat) => seat.seatNumber).join(", ")}
      </div>
      <button onClick={() => setShowDetails(!showDetails)}>
        선택 좌석 상세 보기
      </button>
      {showDetails && (
        <ul>
          {selectedSeats.map((seat) => (
            <li key={seat.seatNumber}>
              좌석 번호: {seat.seatNumber}, 타입: {seat.type}, 가격:{" "}
              {seat.price}원
            </li>
          ))}
        </ul>
      )}
      <div>Total price: {totalPrice}원</div>
    </div>
  );
};

export default SeatBookingPage;
