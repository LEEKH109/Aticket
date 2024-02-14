import {
  dateFormatter,
  dateFormmatterWithTime,
} from "../../util/dateFormatter";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const BookHistoryItem = ({
  id,
  title,
  poster,
  viewing_date_time,
  reservation_confirmation_date_time,
  location,
}) => {
  const formattedViewingtTime = dateFormmatterWithTime(
    new Date(viewing_date_time)
  );
  const formattedReservationTime = dateFormmatterWithTime(
    new Date(reservation_confirmation_date_time)
  );

  return (
    <>
      <div className="flex justify-between items-start">
        <h3 className="mb-2 text-lg font-bold">{title}</h3>
        <IconButton size="small">
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </div>
      <div className="flex gap-4">
        <div className="w-32">
          <img src={poster} />
        </div>
        <div>
          <p>예매 번호: {id}</p>
          <p>예매일: {formattedReservationTime}</p>
          <p>관람일: {formattedViewingtTime}</p>
          <p>관람 장소: {location}</p>
        </div>
      </div>
    </>
  );
};

export default BookHistoryItem;
