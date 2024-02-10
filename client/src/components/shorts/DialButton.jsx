import { useState } from "react";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const DialButton = ({ handleClickCategory, selectedCategory }) => {
  const [open, setOpen] = useState(false);
  const categories = [
    {
      categoryId: "",
      name: "전체",
    },
    {
      categoryId: "SHOW",
      name: "전시",
    },
    {
      categoryId: "MUSICAL",
      name: "뮤지컬",
    },
    {
      categoryId: "PLAY",
      name: "연극",
    },
  ];

  const handleClickEvent = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickEvent}>
        {open ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
      </Button>
      {open && (
        <ul className="flex gap-2">
          {categories.map((category) => (
            <li key={category.categoryId}>
              <Button
                variant="contained"
                color={selectedCategory == category.categoryId ? "primary" : "error"}
                onClick={() => handleClickCategory(category.categoryId)}
              >
                {category.name}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DialButton;
