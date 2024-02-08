import { useNavigate } from "react-router-dom";
import { useState, forwardRef } from "react";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import ShortsInfo from "./ShortsInfo";
import DetailPage from "../../pages/DetailPage";

// const ITEM_HEIGHT = Math.round(window.innerHeight) - 64;
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Shorts = ({ items, itemWidth, itemHeight }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [curIndex, setCurIndex] = useState(0);
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setIsDragging(false);
    setOpenDialog(false);
  }
  
  const handleMouseUp = (shortsId) => {
    if (!isDragging) {
      setCurIndex(shortsId);
      setOpenDialog(true);

      // navigate("/art", {
      //   state: {
      //     shortsId,
      //   }
      // });
    }
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  const handleMouseDown = () => {
    setIsDragging(false);
  };


  return (
    <>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        sx={{marginBottom:'64px'}}
        maxWidth="xs"
        hideBackdrop={true}
        PaperProps={{
          style: {
            boxShadow: 'none'
          },
        }}
      >
      <DetailPage shortsId={curIndex} backIconClick={handleCloseDialog}/>
      </Dialog>
      {items.map((image) => (
        <div key={image.id} className="relative w-full flex-shrink-0" style={{ height: `${itemHeight}px` }}>
          {
            image.type == "video" ? (
              <video
            autoPlay
            loop
            className="h-full object-cover"
            onMouseUp={() => handleMouseUp(image.id)}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
          >
            <source src={image.download_url} type="video/mp4" />
          </video>
            )
            :
            (
              <img
          src={image.download_url}
          className="h-full object-cover"
          onMouseUp={() => handleMouseUp(image.id)}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
        />
            )
          }
          <ShortsInfo info={image.author} />
        </div>
      ))}
    </>
  );
};

export default Shorts;
