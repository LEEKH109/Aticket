import { useState, useEffect } from "react";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import BookHistoryItem from "./BookHistoryItem";

const HEIGHT = `h-[calc(100vh_-_2.5rem_-_128px_-_41px_-_64px)]`;
const LIST = [
  {
    reservation_id: 1,
    title: "닉나이트 : 거침없이 아름답게",
    poster_url: "https://og-data.s3.amazonaws.com/media/exhibitions/image/3680/ei_3680.jpg",
    price: "5000",
    reservation_confirmation_date_time: "2023-02-15T12:00:00Z",
    viewing_date_time: "2023-01-08T12:00:00Z",
    location: "대림미술관",
  },
  {
    reservation_id: 2,
    title: "Looking Into____",
    poster_url:
      "http://artnet.kr/data/file/1540558593/thumb-2948662208_Xb98Y0FP_eba82e00c01a1cc9965659c368b419deb3da2f22_980x1386.jpg",
    price: "15000",
    reservation_confirmation_date_time: "2023-01-15T12:00:00Z",
    viewing_date_time: "2023-01-08T12:00:00Z",
    location: "빠르크에디션",
  },
  {
    reservation_id: 3,
    title: "뮤지컬 〈레베카〉 10주년 기념공연 앙코르",
    poster_url:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2024/01/20240122091846628da9d7-17fd-46b6-a586-73bbd047b1af.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
    price: "140000",
    reservation_confirmation_date_time: "2023-01-15T12:00:00Z",
    viewing_date_time: "2023-01-08T12:00:00Z",
    location: "LG아트센터 서울",
  },
];

const BookHistoryList = () => {
  const [bookhistoryList, setbookhistoryList] = useState();

  useEffect(() => {
    // 예매 내역 받아오는 로직
  }, []);

  return (
    <section className={`w-full ${HEIGHT} flex flex-col overflow-y-scroll`}>
      {LIST.map((item) => (
        <div key={item.reservation_id} className="p-4 border-b-2 last:border-0">
          <BookHistoryItem
            id={item.reservation_id}
            title={item.title}
            poster={item.poster_url}
            price={item.price}
            viewing_date_time={item.viewing_date_time}
            reservation_confirmation_date_time={item.reservation_confirmation_date_time}
            location={item.location}
          />
        </div>
      ))}
    </section>
    // <section className={`w-full ${HEIGHT} p-4 flex flex-col gap-4 justify-center items-center`}>
    //   <div className="p-4 border-4 rounded-full">
    //     <ConfirmationNumberOutlinedIcon fontSize="large" color="disabled" />
    //   </div>
    //   <p className="text-xl text-gray-400">예매한 이력이 없습니다.</p>
    // </section>
  );
};

export default BookHistoryList;
