import { useState, useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "./Modal";

const UserInfo = ({
  nickname,
  profileImage,
  email,
  updateSuccess,
  onChangeProfileImage,
  onChangeNickname,
  onSubmitUserInfo,
}) => {
  const [previewImage, setPreviewImage] = useState();
  const imgRef = useRef();
  const dialog = useRef();

  // 수정하는 모달 여는 이벤트
  const handleButtonClick = () => {
    dialog.current.open();
  };

  // 업로드한 이미지 미리보기(수정 필요)
  const handleChangeProfileImg = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result);
    };

    onChangeProfileImage(imgRef.current.files[0]);
  };

  // 수정에 성공했을 때 모달 닫기
  useEffect(() => {
    dialog.current.close();
  }, [updateSuccess]);

  return (
    <>
      <Modal ref={dialog}>
        <section className="flex flex-col items-center gap-4">
          <p className="font-bold text-xl">프로필 편집</p>
          <div className="w-24 h-24 overflow-hidden border-2 rounded-full">
            <img src={previewImage} className="h-full object-cover" />
          </div>
          <div className="flex gap-4">
            <div>
              <label htmlFor="profile-img">이미지 수정하기</label>
              <input type="file" className="hidden" id="profile-img" ref={imgRef} onChange={handleChangeProfileImg} />
            </div>
            <button>이미지 삭제하기</button>
          </div>
          <div className="w-full">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
              onChange={(e) => onChangeNickname(e.target.value)}
              value={nickname.new}
            />
          </div>
          <button onClick={onSubmitUserInfo}>수정하기</button>
        </section>
      </Modal>
      <section className="flex px-6 py-4 gap-6 items-center ">
        <div className="w-24 h-24 flex-shrink-0 border rounded-full overflow-hidden">
          <img src={profileImage.prev} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl">{nickname.prev}</h3>
            <IconButton size="small" onClick={handleButtonClick}>
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
          <p>{email}</p>
        </div>
      </section>
    </>
  );
};

export default UserInfo;
