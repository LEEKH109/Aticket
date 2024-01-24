import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

function Footer() {
  const [value, setValue] = useState("home");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex w-full h-16 bottom-0">
      <BottomNavigation sx={{ width: "100%", height: "100%" }} value={value} onChange={handleChange}>
        <BottomNavigationAction value="home" icon={<HomeIcon />} onClick={() => navigate("/")} />
        <BottomNavigationAction value="chat" icon={<ForumIcon />} onClick={() => navigate("/chat")} />
        <BottomNavigationAction value="user" icon={<AccountCircleIcon />} onClick={() => navigate("/user")} />
      </BottomNavigation>
    </div>
  );
}

export default Footer;
