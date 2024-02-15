import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/profile/UserInfo";
import CollectionList from "../components/profile/CollectionList";
import BookHistoryList from "../components/profile/BookHistoryList";
import { LoginContext } from "../components/LoginContext";
import { UserApi } from "../util/user-axios";

const MyPage = () => {
  const [nickname, setNickname] = useState({ prev: "", new: "" });
  const [profileImage, setProfileImage] = useState({
    prev: "",
    new: "",
  });
  const [email, setEmail] = useState();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [nowCollectionTab, setNowCollectionTab] = useState(true);
  const { userId, setProfileImg } = useContext(LoginContext);

  // 유저가 이미지 바꿀 때
  const handleChangeProfileImage = (value) => {
    setProfileImage((prev) => {
      return { ...prev, new: value };
    });
  };

  // 유저가 닉네임 바꿀 때
  const handleChangeNickname = (value) => {
    setNickname((prev) => {
      return { ...prev, new: value };
    });
  };

  // 닉네임 수정하기 버튼 눌렀을 때
  const handleSubmitNickname = () => {
    UserApi.updateNickname(userId, { nickname: nickname.new })
      .then(({ data }) => {
        setNickname({ prev: data.data.nickname, new: data.data.nickname });
        setUpdateSuccess(true);
      })
      .catch((err) => {
        setUpdateSuccess(false);
        console.err(err);
      });

    setUpdateSuccess(false);
  };

  // 프로필 이미지 수정하기 버튼 눌렀을 때
  const handleSubmitProfileImage = (isDeleting) => {
    if (isDeleting) {
      UserApi.deleteProfileImgae(userId)
        .then(({ data }) => {
          setProfileImage({
            prev: data.data.profileUrl,
            new: data.data.profileUrl,
          });
          setProfileImg(data.data.profileUrl);
          setUpdateSuccess(true);
        })
        .catch((err) => {
          setUpdateSuccess(false);
          console.error(err);
        });

      setUpdateSuccess(false);
      return;
    }

    const fd = new FormData();
    fd.append("file", profileImage.new);
    UserApi.updateProfileImage(userId, fd)
      .then(({ data }) => {
        setProfileImage({
          prev: data.data.profileUrl,
          new: data.data.profileUrl,
        });
        setProfileImg(data.data.profileUrl);
        setUpdateSuccess(true);
      })
      .catch((err) => {
        setUpdateSuccess(false);
        console.error(err);
      });

    setUpdateSuccess(false);
  };

  // 로그인 유저 정보 받아오기
  useEffect(() => {
    UserApi.getUserInfo(userId)
      .then(({ data }) => {
        setNickname({ prev: data.data.nickname, new: data.data.nickname });
        setProfileImage({
          prev: data.data.profileUrl,
          new: data.data.profileUrl,
        });
        setEmail(data.data.email);
      })
      .catch((err) => console.error(err));
  }, []);

  const tabBarClass =
    "relative text-gray-900 after:w-full after:h-1 after:bg-black after:bottom-[-0.5rem] after:absolute after:left-0";

  return (
    <main className="w-full h-[calc(100svh_-_64px)] pt-4">
      <UserInfo
        nickname={nickname}
        profileImage={profileImage}
        email={email}
        updateSuccess={updateSuccess}
        onChangeProfileImage={handleChangeProfileImage}
        onChangeNickname={handleChangeNickname}
        onSubmitNickname={handleSubmitNickname}
        onSubmitProfileImage={handleSubmitProfileImage}
      />
      <div className="flex justify-around py-2 border-b-[1px] border-gray-300 text-gray-400">
        <button
          className={`${nowCollectionTab ? tabBarClass : ""} `}
          onClick={() => setNowCollectionTab(true)}
        >
          컬렉션
        </button>
        <button
          className={`${!nowCollectionTab ? tabBarClass : ""} `}
          onClick={() => setNowCollectionTab(false)}
        >
          예매 내역
        </button>
      </div>
      {nowCollectionTab && <CollectionList />}
      {!nowCollectionTab && <BookHistoryList userId={userId} />}
    </main>
  );
};

export default MyPage;
