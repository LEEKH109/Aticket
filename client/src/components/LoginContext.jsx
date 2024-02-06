import { useState, useContext, useMemo, createContext } from "react";

const loginId = localStorage.getItem("userId");
const refreshToken = localStorage.getItem("refreshToken");
const accessToken = localStorage.getItem("accessToken");

export const LoginContext = createContext({
  isLogin: "",
  userId: "",
  setLogin: () => {},
  setUserId: () => {},
});

export function IsLoginProvider({ children }) {
  const [isLogin, setLogin] = useState(loginId !== null);
  const [userId, setUserId] = useState(loginId);
  // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
  const value = useMemo(() => ({ isLogin, setLogin, userId, setUserId }), [isLogin, setLogin]);
  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}
export function useLoginState() {
  const context = useContext(LoginContext);
  console.log("login context", context);
  if (!context) {
    throw new Error("Cannot find LoginProvider");
  }
  return context;
}
