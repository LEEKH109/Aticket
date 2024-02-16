import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const DialButton = ({ onClickCategory, selectedCategory }) => {
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

  return (
    <>
      <button
        className="p-2 px-3 bg-neutral-700 text-white rounded-lg"
        variant="contained"
        onClick={() => setOpen(!open)}
      >
        {open ? <ArrowBackIosNewIcon fontSize="small" /> : <ArrowForwardIosIcon fontSize="small" />}
      </button>
      {open && (
        <ul className="flex gap-2">
          {categories.map((category) => (
            <li key={category.categoryId}>
              <button
                className={`p-2 px-3 rounded-lg ${
                  selectedCategory == category.categoryId
                    ? "bg-white text-black"
                    : "bg-neutral-700 text-white"
                }`}
                variant="contained"
                color={selectedCategory == category.categoryId ? "primary" : "error"}
                onClick={() => onClickCategory(category.categoryId)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DialButton;
