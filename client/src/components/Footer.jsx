import { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useLoginState } from "./LoginContext";

function Footer() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { isLogin, profileImg } = useLoginState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex w-full h-16 bottom-0">
      <BottomNavigation
        showLabels
        sx={{ width: "100%", height: "100%" }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          value="home"
          label="홈"
          icon={<HomeIcon fontSize="large" />}
          onClick={() => navigate("/short")}
        />
        <BottomNavigationAction
          value="chat"
          label="채팅"
          icon={<ForumIcon fontSize="large" />}
          onClick={() => navigate("/chat")}
        />
        {isLogin ? (
          <BottomNavigationAction
            value="user"
            icon={<Avatar src={profileImg} sx={{ width: 36, height: 36 }} />}
            label="마이페이지"
            onClick={() => navigate("/user")}
          />
        ) : (
          <BottomNavigationAction
            value="user"
            label="로그인"
            icon={<AccountCircleIcon fontSize="large" color="disabled" />}
            onClick={() => navigate("/loginpage")}
          />
        )}
      </BottomNavigation>
    </div>
  );
}

export default Footer;
