import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../components/LoginContext";
const MyPage = () => {
    const navigate = useNavigate();
    const { setLogin } = useContext(LoginContext);
    const userName = localStorage.getItem("name");
    const logout = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        setLogin(false);
        navigate("/");
    }
    return(
        <>
            <div className="h-[calc(100%_-_64px)] flex-col align-middle content-center justify-center items-center bg-slate-100 text-center">
                <p>{userName}님 반갑습니다.</p>
                <button onClick={logout} className="bg-red-500 text-white p-1 rounded-md">로그아웃</button>
            </div>
        </>
    )
}

export default MyPage;
