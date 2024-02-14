const dateFormmatterWithTime = (date) => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart
    .split("-")
    .map((num) => parseInt(num, 10));
  const [hour, minute, second] = timePart
    .split(":")
    .map((num) => parseInt(num, 10));

  const date = new Date(year, month - 1, day, hour, minute, second);

  const formattedDate = [
    date.getFullYear(),
    ("0" + (date.getMonth() + 1)).slice(-2),
    ("0" + date.getDate()).slice(-2),
  ].join(".");

  const dayLabel = week[date.getDay()];
  const formattedTime = [
    ("0" + date.getHours()).slice(-2),
    ("0" + date.getMinutes()).slice(-2),
  ].join(":");

  return `${formattedDate}(${dayLabel}) ${formattedTime}`;
};

export { dateFormmatterWithTime };
