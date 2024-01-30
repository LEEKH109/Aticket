import { useState, useEffect } from "react";
import UserInfo from "../components/UserInfo";
import { Link, Outlet, useLocation } from "react-router-dom";

const MyPage = () => {
  const [nowCollectionTab, setNowCollectionTab] = useState(true);

  const location = useLocation();
  const path = location.pathname.slice(6);

  useEffect(() => {
    if (path === "bookhistory") {
      setNowCollectionTab(false);
    }
  }, []);

  const tabBarClass =
    "relative text-gray-900 after:w-full after:h-1 after:bg-black after:bottom-[-0.5rem] after:absolute after:left-0";

  return (
    <main className="w-full h-[calc(100vh_-_64px)] pt-10">
      <UserInfo />
      <div className="flex justify-around py-2 border-b-[1px] border-gray-300 text-gray-400">
        <Link
          to="/user/collection"
          className={`${nowCollectionTab ? tabBarClass : ""} `}
          onClick={() => setNowCollectionTab(true)}
        >
          컬렉션
        </Link>
        <Link
          to="/user/bookhistory"
          className={`${!nowCollectionTab ? tabBarClass : ""} `}
          onClick={() => setNowCollectionTab(false)}
        >
          예매 내역
        </Link>
      </div>
      <Outlet />
    </main>
  );
};

export default MyPage;
