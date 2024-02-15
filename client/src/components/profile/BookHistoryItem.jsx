import { dateFormmatterWithTime } from "../../util/dateFormatter";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const BookHistoryItem = ({ id, title, poster, viewing_date_time, reservation_confirmation_date_time, location }) => {
  const formattedViewingTime = dateFormmatterWithTime(viewing_date_time);
  const formattedReservationTime = dateFormmatterWithTime(reservation_confirmation_date_time);

  return (
    <>
      <div className="flex justify-between items-start">
        <h3 className="mb-2 text-lg font-bold">{title}</h3>
      </div>
      <div className="flex gap-4">
        <div className="w-20 flex-shrink-0">
          <img src={poster} />
        </div>
        <div className="text-sm">
          <p>예매 번호: {id}</p>
          <p>예매일: {formattedReservationTime}</p>
          <p>관람일: {formattedViewingTime}</p>
          <p>관람 장소: {location}</p>
        </div>
      </div>
    </>
  );
};

export default BookHistoryItem;
