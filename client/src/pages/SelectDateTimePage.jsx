import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import TimeTable from "../components/TimeTable";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const SelectDateTimePage = () => {
  const [value, setValue] = useState(dayjs());

  const handleDateClick = (day) => {
    const formattedDate = day.format("YYYY-MM-DD");
    console.log("Selected Date:", formattedDate);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
    handleDateClick(newValue);
  };

  useEffect(() => {
    handleDateClick(value);
  }, []);

  let timeList = {
    day: "2024-01-10",
    schedule: ["10:30", "12:30", "13:30", "15:30", "17:30", "19:00"],
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          className="bg-auto bg-white rounded-md"
          value={value}
          onChange={handleChange}
        />
      </LocalizationProvider>
      <TimeTable timeList={timeList} />
    </>
  );
};

export default SelectDateTimePage;
