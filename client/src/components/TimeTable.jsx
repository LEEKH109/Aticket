import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import theme from "../util/theme";

const TimeTable = ({ timeList }) => {
  const [list, setList] = useState(timeList);

  useEffect(() => {
    setList(timeList);
  }, [timeList]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-1">
        {list.schedule.map((time, index) => (
          <Button
            key={index}
            variant="contained"
            style={{
              backgroundColor: theme.dark.point,
              color: theme.dark.main,
            }}
            className="text-lg px-5 py-2 rounded-5g"
            size="small"
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeTable;
