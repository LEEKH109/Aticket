import { useState, useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../Modal";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";

const UserInfo = ({
  nickname,
  profileImage,
  email,
  updateSuccess,
  onChangeProfileImage,
  onChangeNickname,
  onDeleteProfileImage,
  onSubmitNickname,
  onSubmitProfileImage,
}) => {
  const [previewImage, setPreviewImage] = useState();
  const [validNickname, setValidNickname] = useState(true);
  const imgRef = useRef();
  const nicknameDialogRef = useRef();
  const profileImageDialogRef = useRef();

  // 닉네임 유효성 검사
  const handleChangeNickname = (e) => {
    if (!e.target.value.match(/[^a-zA-Z0-9ㄱ-힣]/g) && e.target.value.length < 10) {
      setValidNickname(true);
    } else {
      setValidNickname(false);
    }

    onChangeNickname(e.target.value);
  };

  // 업로드한 이미지 미리보기(수정 필요)
  const handleChangeProfileImg = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result);
    };

    onChangeProfileImage(file);
  };

  // 수정에 성공했을 때 모달 닫기
  useEffect(() => {
    if (updateSuccess) {
      nicknameDialogRef.current.close();
      profileImageDialogRef.current.close();
    }
  }, [updateSuccess]);

  useEffect(() => {
    setPreviewImage(profileImage.prev);
  }, [profileImage.prev]);

  return (
    <>
      <Modal ref={nicknameDialogRef}>
        <section className="flex flex-col items-center gap-4">
          <p className="font-bold text-xl">닉네임 수정</p>
          <div className="w-full">
            <label htmlFor="nickname" className="hidden">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2 ${
                !validNickname ? "border-red-500 " : ""
              }`}
              onChange={handleChangeNickname}
              value={nickname.new}
            />
            {!validNickname && <p className="text-red-500">2~10자의 한글, 영어, 숫자만 입력해주세요.</p>}
          </div>
          <button
            className={`${!validNickname ? "text-gray-300" : ""}`}
            onClick={onSubmitNickname}
            disabled={!validNickname}
          >
            수정하기
          </button>
        </section>
      </Modal>
      <Modal ref={profileImageDialogRef}>
        <section className="flex flex-col items-center gap-4">
          <p className="font-bold text-xl">프로필 이미지 편집</p>
          <div className="w-24 h-24 overflow-hidden border-2 rounded-full">
            <img src={previewImage} className="h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-12">
              <div>
                <label htmlFor="profile-img">변경하기</label>
                <input type="file" className="hidden" id="profile-img" ref={imgRef} onChange={handleChangeProfileImg} />
              </div>
              <button onClick={onDeleteProfileImage}>삭제하기</button>
            </div>
            <button onClick={onSubmitProfileImage}>저장하기</button>
          </div>
        </section>
      </Modal>
      <section className="flex px-6 py-4 gap-6 items-center ">
        <div className="relative w-24 h-24 flex-shrink-0 border rounded-full overflow-hidden">
          <img src={profileImage.prev} />
          <button
            className="absolute w-full py-1 bottom-0 bg-gray-500/50 text-white"
            onClick={() => profileImageDialogRef.current.open()}
          >
            <PhotoSizeSelectActualIcon />
          </button>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl">{nickname.prev}</h3>
            <IconButton size="small" onClick={() => nicknameDialogRef.current.open()}>
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
