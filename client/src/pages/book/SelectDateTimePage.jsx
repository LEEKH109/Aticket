import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { timetableApi } from "../../util/timetable-axios";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../util/theme";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TimeTable from "../../components/book/TimeTable";
import { LoginContext } from "../../components/LoginContext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const SelectDateTimePage = ({}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [availableDates, setAvailableDates] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const { userId } = useContext(LoginContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { shortInfo } = state || {};

  const themePicker = createTheme({
    palette: {
      primary: {
        light: theme.dark.point,
        main: theme.dark.point,
        dark: theme.dark.point,
      },
    },
  });

  useEffect(() => {
    timetableApi
      .getAvailableDates(shortInfo.artId)
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
      .getTimetables(shortInfo.artId, formattedDate)
      .then((response) => setTimetable(response.data))
      .catch((error) => console.error("Error fetching timetable:", error));
  }, [selectedDate]);

  const isDateAvailable = (date) =>
    availableDates.some((availableDate) => availableDate.isSame(date, "day"));

  return (
    <ThemeProvider theme={themePicker}>
      <div className="flex flex-col h-[calc(100svh-64px)] overflow-auto">
        <div className="w-full">
          <div className="flex gap-0 px-5">
            <ArrowBackIosIcon />
            <div>Aːticket</div>
          </div>
          <div className="flex gap-0 px-5 text-xs font-bold text-center text-white mb-4">
            <div className="grow justify-center px-12 py-2 bg-black rounded-md border border-white border-solid">
              1. 관람일/인원 선택
            </div>
            <div className="justify-center px-6 py-2 whitespace-nowrap bg-black rounded-md border border-white border-solid ">
              2.
            </div>
            <div className="justify-center px-6 py-2 whitespace-nowrap bg-black rounded-md border border-white border-solid ">
              3.
            </div>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={selectedDate}
              onChange={setSelectedDate}
              shouldDisableDate={(date) => !isDateAvailable(date)}
            />
          </LocalizationProvider>
          <TimeTable
            timeList={timetable}
            userId={userId}
            shortInfo={shortInfo}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SelectDateTimePage;
