import { useState } from "react";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const DialButton = ({ handleClickCategory, selectedCategory }) => {
  const [open, setOpen] = useState(false);
  const categories = ["전체", "연극", "전시", "뮤지컬"];

  const handleClickEvent = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleCategory = (category) => {
    handleClickCategory(category);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickEvent}>
        {open ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
      </Button>
      {open && (
        <ul className="flex gap-2">
          {categories.map((category) => (
            <li key={category}>
              <Button
                variant="contained"
                color={selectedCategory === category ? "primary" : "error"}
                onClick={() => handleCategory(category)}
              >
                {category}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DialButton;
