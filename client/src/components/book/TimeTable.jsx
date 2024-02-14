import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TicketModal from "./TicketModal";
import theme from "../../util/theme";
import { timetableApi } from "../../util/timetable-axios";
import { useNavigate } from "react-router-dom";

const TimeTable = ({ timeList, userId, shortInfo }) => {
  console.log("timeList", timeList);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!shortInfo || !shortInfo.category) {
      alert("잘못된 접근입니다");
      navigate("/");
    }
  }, [shortInfo]);

  const handleTimeClick = (timeInfo) => {
    if (shortInfo.category === "SHOW") {
      timetableApi
        .getTicketTypes(timeInfo.timetableId)
        .then((response) => {
          setSelectedTime({
            ...timeInfo,
            ticketTypes: response.data.ticketTypes,
          });
          setOpenModal(true);
        })
        .catch((error) => {
          console.error("Error fetching ticket types:", error);
        });
    } else {
      navigate("/book/seat", {
        state: {
          timetableId: timeInfo.timetableId,
          userId: userId,
          artId: shortInfo.artId,
          shortInfo: shortInfo,
        },
      });
    }
  };

  // 오전과 오후 시간 데이터를 분리하는 로직
  const morningTimes = timeList.filter(
    (time) => parseInt(time.startTime.split(":")[0]) < 12
  );
  const afternoonTimes = timeList.filter(
    (time) => parseInt(time.startTime.split(":")[0]) >= 12
  );

  const formatTime = (timeString) => {
    if (!timeString) return ""; // timeString이 undefined이거나 빈 문자열인 경우 빈 문자열 반환

    const match = timeString.match(/(\d{2}:\d{2}):\d{2}/);
    return match ? match[1] : timeString; // HH:mm 부분만 반환
  };

  return (
    <div className="flex justify-center bg-white px-12">
      <div className="w-full max-w-[412px]">
        <p className="text-xl font-bold">오전</p>
        <div className="flex flex-wrap justify-start gap-2 mb-4">
          {morningTimes.map((timeInfo, index) => (
            <Button
              key={index}
              variant="contained"
              style={{
                borderRadius: 20,
                backgroundColor: theme.dark.point,
                color: theme.dark.main,
                padding: "3px 6px",
              }}
              size="small"
              onClick={() => handleTimeClick(timeInfo)}
            >
              {formatTime(timeInfo.startTime)}
            </Button>
          ))}
        </div>
        <p className="text-xl font-bold">오후</p>
        <div className="flex flex-wrap justify-start gap-2">
          {afternoonTimes.map((timeInfo, index) => (
            <Button
              key={index}
              variant="contained"
              style={{
                borderRadius: 20,
                backgroundColor: theme.dark.point,
                color: theme.dark.main,
                padding: "3px 6px",
              }}
              size="small"
              onClick={() => handleTimeClick(timeInfo)}
            >
              {formatTime(timeInfo.startTime)}
            </Button>
          ))}
        </div>
      </div>
      {selectedTime && (
        <TicketModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          artId={selectedTime.artId}
          timetableId={selectedTime.timetableId}
          ticketTypes={selectedTime.ticketTypes}
          userId={userId}
          shortInfo={shortInfo}
        />
      )}
    </div>
  );
};

export default TimeTable;
