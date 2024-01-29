import { useState, useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import Modal from "./Modal";

const UserInfo = () => {
  const [profileImage, setProfileImage] = useState();
  const [nickname, setNickname] = useState("");
  const imgRef = useRef();
  const nicknameRef = useRef();
  const dialog = useRef();

  const handleButtonClick = () => {
    dialog.current.open();
  };

  const handleImageChange = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImage(reader.result);
    };
  };

  useEffect(() => {
    // 로그인한 사용자의 닉네임 받아오는 로직(임시로 하드코딩)
    setNickname("배고픈 프로도");
    nicknameRef.current.value = "배고픈 프로도";
  }, []);

  return (
    <>
      <Modal ref={dialog}>
        <section className="flex flex-col items-center gap-4">
          <p className="font-bold text-xl">프로필 편집</p>
          <div className="w-24 h-24 overflow-hidden border-2 rounded-full">
            <img
              src={
                profileImage
                  ? profileImage
                  : "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a"
              }
              className="h-full object-cover"
            />
          </div>
          <div className="flex gap-4">
            <div>
              <label htmlFor="profile-img">이미지 수정하기</label>
              <input type="file" className="hidden" id="profile-img" ref={imgRef} onChange={handleImageChange} />
            </div>
            <button>이미지 삭제하기</button>
          </div>
          <div className="w-full">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
              ref={nicknameRef}
            />
          </div>
          <button>수정하기</button>
        </section>
      </Modal>
      <section className="flex px-6 py-4 gap-6 items-center ">
        <div className="w-24 flex-shrink-0 border rounded-full overflow-hidden">
          <img src="https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl">배고픈 프로도</h3>
            <IconButton size="small" onClick={handleButtonClick}>
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
          <p>email@naver.com</p>
        </div>
      </section>
    </>
  );
};

export default UserInfo;
