import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { timetableApi } from "../../util/timetable-axios";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import TimeTable from "../../components/TimeTable";

const SelectDateTimePage = ({ artId }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [availableDates, setAvailableDates] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!artId || artId < 1) {
    //   navigate("/");
    //   return;
    // }
    timetableApi
      .getAvailableDates(1)
      .then((response) => {
        console.log("dates", response);
        const dates = response.data
          .map((dateObj) => dayjs(dateObj.date))
          .filter((date) => date.isAfter(dayjs())); // 오늘 날짜 이전 일자는 제외(유효성 체크)
        if (dates.length === 0) {
          // 예약 가능한 날짜가 없을 때 처리(유효성 체크)
          navigate("/");
          return;
        }
        setAvailableDates(dates);
        // 오늘 이후 예약 가능한 날짜 중 가장 빠른 날 선택
        const earliestAvailableDate = dates.sort(
          (a, b) => a.unix() - b.unix()
        )[0];
        // 단순 sort하면 03-01이 02-15보다 앞으로 오는 문제가 생기므로 sort 커스텀
        setSelectedDate(earliestAvailableDate);
      })
      .catch((error) => {
        console.error("Error fetching available dates:", error);
      });
  }, []);

  useEffect(() => {
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    timetableApi
      .getTimetables(1, formattedDate)
      .then((response) => setTimetable(response.data))
      .catch((error) => console.error("Error fetching timetable:", error));
  }, [selectedDate]);

  const isDateAvailable = (date) =>
    availableDates.some((availableDate) => availableDate.isSame(date, "day"));

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={selectedDate}
          onChange={setSelectedDate}
          shouldDisableDate={(date) => !isDateAvailable(date)}
        />
      </LocalizationProvider>
      <TimeTable timeList={timetable} />
    </div>
  );
};

export default SelectDateTimePage;
