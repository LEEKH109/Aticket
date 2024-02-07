import { useState, useEffect, useContext } from "react";
import UserInfo from "../components/profile/UserInfo";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../components/LoginContext";
import { UserApi } from "../util/user-axios";

const MyPage = () => {
  const [nickname, setNickname] = useState({ prev: "", new: "" });
  const [profileImage, setProfileImage] = useState({ prev: "", new: "" });
  const [email, setEmail] = useState();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [nowCollectionTab, setNowCollectionTab] = useState(true);

  const location = useLocation();
  const path = location.pathname.slice(6);
  const navigate = useNavigate();
  const { setLogin, userId, setUserId } = useContext(LoginContext);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLogin(false);
    setUserId(undefined);
    navigate("/");
  };

  // 유저가 이미지 바꿨을 때
  const handleChangeImage = (value) => {
    setProfileImage((prev) => {
      return { ...prev, new: value };
    });
  };

  // 유저가 닉네임 바꿨을 때
  const handleChangeNickname = (value) => {
    setNickname((prev) => {
      return { ...prev, new: value };
    });
  };

  // 프로필 이미지 삭제했을 때
  const handleDeleteProfileImage = () => {
    UserApi.deleteProfileImgae(userId)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  // 최종 수정하기 버튼 눌렀을
  const handleSubmitUserInfo = () => {
    if (nickname.prev != nickname.new) {
      UserApi.updateNickname(userId, { nickname: nickname.new })
        .then((res) => {
          setUpdateSuccess(true);
          console.log("닉네임 수정 성공", res.data.data);
        })
        .catch((err) => {
          setUpdateSuccess(false);
          console.error(err);
        });
    }

    // 닉네임만 바꿨을 때는 이미지 수정 api를 호출하지 않음
    if (profileImage.new != profileImage.prev) {
      const fd = new FormData();
      fd.append("file", profileImage.new);

      UserApi.updateProfileImage(userId, fd)
        .then((res) => {
          console.log(res);
          setUpdateSuccess(true);
        })
        .catch((err) => {
          setUpdateSuccess(false);
          console.error(err);
        });
    }

    setUpdateSuccess(false);
  };

  useEffect(() => {
    if (path === "bookhistory") {
      setNowCollectionTab(false);
    }
  }, []);

  // 로그인 유저 정보 받아오기
  useEffect(() => {
    UserApi.getUserInfo(userId)
      .then((res) => {
        const data = res.data.data;
        setNickname({ prev: data.nickname, new: data.nickname });
        setProfileImage({ prev: data.profileUrl, new: data.profileUrl });
        setEmail(data.email);
      })
      .catch((err) => console.error(err));
  }, [updateSuccess]);

  const tabBarClass =
    "relative text-gray-900 after:w-full after:h-1 after:bg-black after:bottom-[-0.5rem] after:absolute after:left-0";

  return (
    <main className="w-full h-[calc(100vh_-_64px)] pt-10">
      <button onClick={logout}>로그아웃</button>
      <UserInfo
        nickname={nickname}
        profileImage={profileImage}
        email={email}
        updateSuccess={updateSuccess}
        onChangeProfileImage={handleChangeImage}
        onChangeNickname={handleChangeNickname}
        onDeleteProfileImage={handleDeleteProfileImage}
        onSubmitUserInfo={handleSubmitUserInfo}
      />
      <div className="flex justify-around py-2 border-b-[1px] border-gray-300 text-gray-400">
        {}
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
