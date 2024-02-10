import instance from "./interceptor";

const UserApi = {
  // 유저 정보 불러오기
  getUserInfo: (id) => {
    return instance.get(`/user/${id}`);
  },

  // 프로필 이미지 수정
  updateProfileImage: (userId, data) => {
    return instance.put(`/user/${userId}/profile`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // 닉네임 수정
  updateNickname: (userId, data) => {
    return instance.put(`/user/${userId}/nickname`, data);
  },

  // 프로필 이미지 삭제
  deleteProfileImgae: (userId) => {
    return instance.delete(`/user/${userId}/profile`);
  },

  // collection 리스트 받아오기
  getCollections: () => {
    return instance.get(`/shorts/collection`);
  },
};

export { UserApi };
