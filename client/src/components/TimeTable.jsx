import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import theme from "../util/theme";

const TimeTable = ({ timeList }) => {
  // 예약 가능한 시간을 클릭했을 때의 동작을 정의하는 함수
  const handleTimeClick = (timeInfo) => {
    // 여기에 예약 로직을 구현합니다.
    console.log("Selected Time:", timeInfo);
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
    </div>
  );
};

export default TimeTable;
