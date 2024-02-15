import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { LoginContext } from "../LoginContext";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";

const UserInfo = ({
  nickname,
  profileImage,
  email,
  updateSuccess,
  onChangeProfileImage,
  onChangeNickname,
  onSubmitNickname,
  onSubmitProfileImage,
}) => {
  const [previewImage, setPreviewImage] = useState();
  const [validNickname, setValidNickname] = useState(true);
  const [nicknameLength, setNicknameLength] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const { setUserId, setProfileImg, setLogin } = useContext(LoginContext);
  const imgRef = useRef();
  const nicknameDialogRef = useRef();
  const profileImageDialogRef = useRef();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("profileImg");
    setProfileImg("");
    setLogin(false);
    setUserId(undefined);
    navigate("/");
  };

  // 닉네임 유효성 검사
  const handleChangeNickname = (e) => {
    setNicknameLength(e.target.value.length);
    if (!e.target.value.match(/[^a-zA-Z0-9ㄱ-힣]/g) && e.target.value.length <= 10) {
      setValidNickname(true);
    } else {
      setValidNickname(false);
    }

    onChangeNickname(e.target.value);
  };

  const handleDeleteProfileImage = () => {
    setIsDeleting(true);
    setPreviewImage(import.meta.env.VITE_DEFAULT_PROFILE_IMAGE);
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
    setIsDeleting(false);
  }, [updateSuccess]);

  useEffect(() => {
    setPreviewImage(profileImage.new);
  }, [profileImage.new]);

  useEffect(() => {
    setNicknameLength(nickname.prev.length);
  }, [nickname.prev]);

  return (
    <>
      <Modal ref={nicknameDialogRef}>
        <section className="flex flex-col items-center gap-6">
          <p className="font-bold text-xl">닉네임 수정</p>
          <div className="relative w-full">
            <label htmlFor="nickname" className="hidden">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              className={`realtive bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                !validNickname ? "border-red-500 " : ""
              }`}
              maxLength={11}
              onChange={handleChangeNickname}
              value={nickname.new}
            />
            <p className="absolute top-3 right-2 text-end text-sm text-gray-400">{nicknameLength} / 10</p>
            {!validNickname && <p className="text-red-500">2~10자의 한글, 영어, 숫자만 입력해주세요.</p>}
          </div>
          <button
            className={`${!validNickname ? "text-gray-300 bg-gray-100" : ""} px-2 py-1 border  rounded-lg`}
            onClick={onSubmitNickname}
            disabled={!validNickname}
          >
            수정하기
          </button>
        </section>
      </Modal>
      <Modal ref={profileImageDialogRef}>
        <section className="flex flex-col items-center gap-6">
          <p className="font-bold text-xl">이미지 등록</p>
          <div className="relative w-28 h-28 overflow-hidden border">
            <img src={previewImage} className="w-full h-full object-cover" />
            <button className="absolute top-0 right-1 text-white rounded-lg" onClick={handleDeleteProfileImage}>
              <CloseIcon fontSize="small" className="bg-black/50" />
            </button>
          </div>
          <div className="w-full flex flex-col">
            <div className="w-full flex justify-center items-center gap-6">
              <div>
                <label htmlFor="profile-img" className="block px-2 py-1 border rounded-lg cursor-pointer">
                  찾아보기
                </label>
                <input type="file" className="hidden" id="profile-img" ref={imgRef} onChange={handleChangeProfileImg} />
              </div>

              <button className="px-2 py-1 border rounded-lg" onClick={() => onSubmitProfileImage(isDeleting)}>
                저장하기
              </button>
            </div>
          </div>
        </section>
      </Modal>
      <section className="flex px-6 py-4 gap-6 items-center ">
        <div className="relative w-20 h-20 flex-shrink-0 border rounded-full overflow-hidden">
          <img src={profileImage.prev} className="w-full h-full object-cover" />
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
          <button onClick={logout}>로그아웃</button>
        </div>
      </section>
    </>
  );
};

export default UserInfo;
