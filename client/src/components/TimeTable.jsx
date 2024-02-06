import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TicketModal from "./TicketModal";
import theme from "../util/theme";
import { timetableApi } from "../util/timetable-axios";

const TimeTable = ({ timeList }) => {
  console.log("timeList", timeList);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeClick = (timeInfo) => {
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
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-1">
        {timeList.map((timeInfo, index) => (
          <Button
            key={index}
            variant="contained"
            style={{
              backgroundColor: theme.dark.point,
              color: theme.dark.main,
            }}
            className="text-lg px-5 py-2 rounded-5g"
            size="small"
            onClick={() => handleTimeClick(timeInfo)}
          >
            {`${timeInfo.startTime} - ${timeInfo.endTime}`}
          </Button>
        ))}
      </div>
      {selectedTime && (
        <TicketModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          artId={selectedTime.artId}
          timetableId={selectedTime.timetableId}
          ticketTypes={selectedTime.ticketTypes} // 선택된 시간 정보를 TicketModal에 전달
        />
      )}
    </div>
  );
};

export default TimeTable;
