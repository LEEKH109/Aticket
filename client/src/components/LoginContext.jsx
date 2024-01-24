import React, { useState, useContext, useMemo, createContext } from "react";

const userId = sessionStorage.getItem("id");
const token = sessionStorage.getItem("token");

export const LoginContext = createContext({
  isLogin: userId !== null ? true : false,
});
export function IsLoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(
    userId !== null && token !== null ? true : false
  );
  // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
  const value = useMemo(() => ({ isLogin, setIsLogin }), [isLogin, setIsLogin]);
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}
export function useLoginState() {
  const context = useContext(LoginContext);
  if(!context) {
    throw new Error('Cannot find LoginProvider');
  }
  return context.isLogin;
}