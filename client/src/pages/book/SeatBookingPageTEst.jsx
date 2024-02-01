import React, { useState, EventHandler, ReactNode } from "react";

const Seat = ({ seatId, status, onSelect }) => (
  <button
    className={`w-[30px] h-[30px] rounded-tl-[10px] rounded-tr-[10px] ${
      status === "available"
        ? "bg-[#353b44]"
        : status === "selected"
        ? "bg-[#e06a4e]"
        : "bg-[#d9d9d9]"
    }`}
    onClick={() => onSelect(seatId)}
  >
    {seatId}
  </button>
);

const SeatBookingPage = () => {
  const [seats, setSeats] = useState([]);

  const handleSelectSeat = (seatId) => {
    console.log(seatId);
    // 좌석 선택 로직 구현
  };
  return (
    <div className="relative w-[375px] h-[605px]">
      <div className="absolute left-0 top-[420px] w-[375px] h-[30px] flex">
        <div className="absolute left-0 top-0 w-[375px] h-[30px] bg-[#ffffff00]"></div>
        <div className="absolute left-[13px] top-[5px] w-[100px] h-[20px] flex">
          <div className="absolute left-0 top-0 w-[20px] h-[20px] bg-[#d9d9d9] rounded-full"></div>
          <div className="absolute left-[25px] top-0 h-[20px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
            예약 완료
          </div>
        </div>
        <div className="absolute left-[103px] top-[5px] w-[100px] h-[20px] flex">
          <div className="absolute left-0 top-0 w-[20px] h-[20px] bg-[#353b44] rounded-full"></div>
          <div className="absolute left-[25px] top-0 h-[20px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
            예약 가능
          </div>
        </div>
        <div className="absolute left-[193px] top-[5px] w-[100px] h-[20px] flex">
          <div className="absolute left-0 top-0 w-[20px] h-[20px] bg-[#e06a4e] rounded-full"></div>
          <div className="absolute left-[25px] top-0 h-[20px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
            선택한 좌석
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-[450px] w-[375px] h-[53px] flex">
        <div className="absolute left-0 top-0 w-[375px] h-[53px] bg-[#d9d9d900]"></div>
        <div className="absolute left-[25px] top-[7px] w-[250px] h-[40px] text-[12px] font-['Noto_Sans'] font-black text-[#000] flex flex-col justify-center">
          한 개의 ID로 회당 최대 2인까지 예매 가능합니다.
          <br />
          관람하실 인원을 모두 선택해주세요.
        </div>
      </div>
      <div className="absolute left-0 top-0 w-[375px] h-[30px] flex">
        <div className="absolute left-0 top-0 w-[375px] h-[30px] bg-[#ffffff00]"></div>
        <img
          className="absolute left-[2.13%] right-[95.83%] top-[26.67%] bottom-[24.1%]"
          width="7"
          height="14"
          src="shape467_90.png"
        ></img>
      </div>
      <div className="absolute left-0 top-[30px] w-[375px] h-[40px] flex">
        <div className="absolute left-0 top-0 w-[375px] h-[40px] bg-[#ffffff00]"></div>
        <div className="absolute left-[25px] top-[5px] w-[90px] h-[30px] text-[25px] font-['Odor_Mean_Chey'] text-[#000] text-center flex flex-col justify-center">
          Aːticket
        </div>
      </div>
      <div className="absolute left-0 top-[70px] w-[375px] h-[30px] flex">
        <div className="absolute left-0 top-0 w-[375px] h-[30px] flex">
          <div className="absolute left-0 top-0 w-[375px] h-[30px] bg-[#ffffff00]"></div>
        </div>
        <div className="absolute left-[18px] top-[2px] w-[340px] h-[25px] flex">
          <div className="absolute left-[40px] top-0 w-[220px] h-[25px] bg-[#000] border-[1px] border-solid border-[#ffffff00] rounded-[5px]"></div>
          <div className="absolute left-[44px] top-0 w-[226px] h-[25px] text-[12px] font-['Roboto'] font-bold text-[#fff] text-center flex flex-col justify-center">
            좌석 선택
          </div>
          <div className="absolute left-[300px] top-0 w-[40px] h-[25px] flex">
            <div className="absolute left-0 top-0 w-[40px] h-[25px] bg-[#000] border-[1px] border-solid border-[#ffffff00] rounded-[5px]"></div>
            <div className="absolute left-0 top-0 w-[40px] h-[25px] text-[12px] font-['Roboto'] font-bold text-[#fff] text-center flex flex-col justify-center">
              4.
            </div>
          </div>
          <div className="absolute left-[260px] top-0 w-[40px] h-[25px] flex">
            <div className="absolute left-0 top-0 w-[40px] h-[25px] bg-[#000] border-[1px] border-solid border-[#ffffff00] rounded-[5px]"></div>
            <div className="absolute left-0 top-0 w-[40px] h-[25px] text-[12px] font-['Roboto'] font-bold text-[#fff] text-center flex flex-col justify-center">
              3.
            </div>
          </div>
          <div className="absolute left-0 top-0 w-[40px] h-[25px] flex">
            <div className="absolute left-0 top-0 w-[40px] h-[25px] bg-[#000] border-[1px] border-solid border-[#ffffff00] rounded-[5px]"></div>
            <div className="absolute left-0 top-0 w-[40px] h-[25px] text-[12px] font-['Roboto'] font-bold text-[#fff] text-center flex flex-col justify-center">
              1.
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-[100px] w-[375px] h-[320px] flex">
        <div className="absolute left-0 top-0 w-[375px] h-[320px] bg-[#ffffff00]"></div>
        <div className="absolute left-[15px] top-[10px] w-[345px] h-[300px] flex">
          <div className="absolute left-0 top-0 w-[345px] h-[300px] bg-[#e9e7e7] rounded-[15px]"></div>
          <div className="absolute left-[23px] top-[15px] w-[300px] h-[30px] flex">
            <div className="absolute left-0 top-0 w-[300px] h-[30px] border-[8px] border-solid border-[#000]"></div>
          </div>
          <div className="absolute left-[14px] top-[74px] w-[317px] h-[215px] flex">
            <div className="absolute left-[27px] top-[25px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[62px] top-[25px] w-[30px] h-[30px] bg-[#353b44] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[132px] top-[25px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[97px] top-[25px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[27px] top-[65px] w-[30px] h-[30px] bg-[#353b44] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[62px] top-[65px] w-[30px] h-[30px] bg-[#353b44] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[132px] top-[65px] w-[30px] h-[30px] bg-[#353b44] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[97px] top-[65px] w-[30px] h-[30px] bg-[#353b44] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[27px] top-[105px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[62px] top-[105px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[132px] top-[105px] w-[30px] h-[30px] bg-[#e06a4e] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[97px] top-[105px] w-[30px] h-[30px] bg-[#e06a4e] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[27px] top-[145px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[62px] top-[145px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[132px] top-[145px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[97px] top-[145px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[27px] top-[185px] w-[30px] h-[30px] bg-[#353b44] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[62px] top-[185px] w-[30px] h-[30px] bg-[#353b44] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[132px] top-[185px] w-[30px] h-[30px] bg-[#353b44] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[97px] top-[185px] w-[30px] h-[30px] bg-[#353b44] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[182px] top-[25px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[217px] top-[25px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[287px] top-[25px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[252px] top-[25px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[182px] top-[65px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[217px] top-[65px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[287px] top-[65px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[252px] top-[65px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[182px] top-[105px] w-[30px] h-[30px] bg-[#353b44] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[217px] top-[105px] w-[30px] h-[30px] bg-[#353b44] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[287px] top-[105px] w-[30px] h-[30px] bg-[#353b44] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[252px] top-[105px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[182px] top-[145px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[217px] top-[145px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[287px] top-[145px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[252px] top-[145px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[182px] top-[185px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[217px] top-[185px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[287px] top-[185px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-[252px] top-[185px] w-[30px] h-[30px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px] rounded-br-0 rounded-bl-0"></div>
            <div className="absolute left-0 top-[35px] w-[10px] h-[15px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
              A
            </div>
            <div className="absolute left-0 top-[72px] w-[10px] h-[15px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
              B
            </div>
            <div className="absolute left-0 top-[112px] w-[10px] h-[15px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
              C
            </div>
            <div className="absolute left-0 top-[152px] w-[10px] h-[15px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
              D
            </div>
            <div className="absolute left-0 top-[192px] w-[10px] h-[15px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
              E
            </div>
            <div className="absolute left-[37px] top-0 w-[10px] h-[15px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
              1
            </div>
            <div className="absolute left-[72px] top-0 w-[10px] h-[15px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
              2
            </div>
            <div className="absolute left-[110px] top-0 w-[10px] h-[15px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
              3
            </div>
            <div className="absolute left-[142px] top-0 w-[10px] h-[15px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
              4
            </div>
            <div className="absolute left-[192px] top-0 w-[10px] h-[15px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
              5
            </div>
            <div className="absolute left-[227px] top-0 w-[10px] h-[15px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
              6
            </div>
            <div className="absolute left-[262px] top-0 w-[10px] h-[15px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
              7
            </div>
            <div className="absolute left-[297px] top-0 w-[10px] h-[15px] text-[14px] font-['Noto_Sans'] font-bold text-[#000] flex flex-col justify-center">
              8
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-[503px] w-[375px] h-[59px] flex">
        <div className="absolute left-0 top-0 w-[375px] h-[59px] bg-[#d9d9d900]"></div>
        <div className="absolute left-[200px] top-[9px] w-[150px] h-[40px] flex">
          <button className="absolute left-0 top-0" width="40" height="40">
            -
          </button>
          <button
            className="absolute left-[110px] top-0"
            width="40"
            height="40"
          >
            +
          </button>
          <div className="absolute left-[40px] top-0 w-[70px] h-[40px] flex">
            <div className="absolute left-0 top-0 w-[70px] h-[40px] bg-[#fff] border-[solid] border-#000 border border-[1px_0]"></div>
            <div className="absolute left-[35.71%] right-[36.85%] top-[30%] bottom-[36.77%] text-[15px] font-['Roboto'] font-medium text-[#000] text-center">
              2
            </div>
          </div>
        </div>
        <div className="absolute left-[25px] top-[18px] w-[120px] h-[20px] text-[15px] font-['Noto_Sans'] font-black text-[#000] flex flex-col justify-center">
          일반석 15,000원
        </div>
      </div>
      <div className="absolute left-0 top-[562px] w-[375px] h-[43px] flex">
        <div className="absolute left-[25px] top-[9px] w-[325px] h-[25px] flex">
          <div className="absolute left-[226px] top-[4px] w-[90px] h-[15px] text-[15px] font-['Noto_Sans'] font-black text-[#000] text-right flex flex-col justify-center">
            Total 30,000
          </div>
          <div className="absolute left-[24px] top-[4px] w-[60px] h-[15px] text-[12px] font-['Noto_Sans'] font-black text-[#000] text-center flex flex-col justify-center">
            일반석 2인
          </div>
          <div className="absolute left-0 top-0 w-[325px] h-0 border-[1px] border-solid border-[#000]"></div>
          <div className="absolute left-0 top-[25px] w-[325px] h-0 border-[1px] border-solid border-[#000]"></div>
        </div>
        <div className="absolute left-0 top-0 w-[375px] h-[43px] bg-[#d9d9d900]"></div>
      </div>
    </div>
  );
};

export default SeatBookingPage;
