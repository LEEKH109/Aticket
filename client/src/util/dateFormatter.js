const dateFormatter = (date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return year + "." + month + "." + day;
};

function dateFormmatterWithTime(dateTimeString) {
  const normalizedString = dateTimeString.replace("T", " ");

  const [date, time] = normalizedString.split(" ");
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");

  const tempDate = new Date(year, month - 1, day);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayLabel = week[tempDate.getDay()];

  return `${year}.${month}.${day}(${dayLabel}) ${hour}:${minute}`;
}

export { dateFormatter, dateFormmatterWithTime };
