const dateFormatter = (date) => {
  const year = date.getFullYear();
  const month = ("0" + date.getMonth() + 1).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return year + "." + month + "." + day;
};

const dateFormmatterWithTime = (date) => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const year = date.getFullYear();
  const month = ("0" + date.getMonth() + 1).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dayLabel = week[date.getDay()];
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);

  return year + "." + month + "." + day + "(" + dayLabel + ") " + hour + ":" + minute;
};

export { dateFormatter, dateFormmatterWithTime };
