const dateFormmatterWithTime = (dateTimeString) => {
  const dateTimeFormat = dateTimeString.includes("T")
    ? dateTimeString
    : dateTimeString.replace(" ", "T");
  const parsedDate = new Date(`${dateTimeFormat}+09:00`);

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayLabel = week[parsedDate.getDay()];

  const year = parsedDate.getFullYear();
  const month = ("0" + (parsedDate.getMonth() + 1)).slice(-2);
  const day = ("0" + parsedDate.getDate()).slice(-2);
  const hour = ("0" + parsedDate.getHours()).slice(-2);
  const minute = ("0" + parsedDate.getMinutes()).slice(-2);

  return `${year}.${month}.${day}(${dayLabel}) ${hour}:${minute}`;
};

export { dateFormmatterWithTime };
