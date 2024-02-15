import { useState, useEffect } from "react";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import BookHistoryItem from "./BookHistoryItem";
import { billingApi } from "../../util/billing-axios";

const HEIGHT = `h-[calc(100svh_-_1rem_-_128px_-_41px_-_64px)]`;

const BookHistoryList = (userId) => {
  const [bookHistoryList, setBookHistoryList] = useState([]);

  useEffect(() => {
    billingApi
      .retrieveReservationHistory(userId.userId)
      .then((res) => setBookHistoryList(res.data))
      .catch((err) => console.error("load fail", err));
  }, [userId]);

  return (
    <section className={`w-full ${HEIGHT} flex flex-col overflow-y-scroll`}>
      {bookHistoryList.length > 0 ? (
        bookHistoryList.map((item) => (
          <div
            key={item.reservationId}
            className="p-4 border-b-2 last:border-0"
          >
            <BookHistoryItem
              id={item.reservationId}
              title={item.title}
              poster={item.posterUrl}
              viewing_date_time={item.viewingDateTime}
              reservation_confirmation_date_time={
                item.reservationConfirmationDateTime
              }
              location={item.location}
            />
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-xl text-gray-400">예매한 이력이 없습니다.</p>
        </div>
      )}
    </section>
  );
};

export default BookHistoryList;
