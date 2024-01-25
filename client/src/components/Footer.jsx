import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useLoginState } from "./LoginContext";

function Footer() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const isLogin = useLoginState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex w-full h-16 bottom-0">
      <BottomNavigation
        sx={{ width: "100%", height: "100%" }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          value="home"
          icon={<HomeIcon />}
          onClick={() => navigate("/")}
        />
        <BottomNavigationAction
          value="chat"
          icon={<ForumIcon />}
          onClick={() => navigate("/chat")}
        />
        { isLogin ? (
          <BottomNavigationAction
            value="mypage"
            icon={<CoPresentIcon />}
            onClick={() => navigate("/mypage")}
          />
        ) : (
          <BottomNavigationAction
            value="user"
            icon={<AccountCircleIcon />}
            onClick={() => navigate("/loginpage")}
          />
        )}
      </BottomNavigation>
    </div>
  );
}

export default Footer;
