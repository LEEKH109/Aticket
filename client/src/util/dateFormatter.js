const dateFormmatterWithTime = (date) => {
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-");
  const [hour, minute] = timePart.split(":");

  // "date" 대신 "parsedDate" 또는 다른 유니크한 이름을 사용
  const parsedDate = new Date(
    `${year}-${month}-${day}T${hour}:${minute}:00+09:00`
  );
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayLabel = week[parsedDate.getDay()];

  return `${year}.${month}.${day}(${dayLabel}) ${hour}:${minute}`;
};

export { dateFormmatterWithTime };
