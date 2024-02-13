import { useState, useEffect, forwardRef } from "react";
import ShortsInfo from "./ShortsInfo";
import ShortsInfoLoading from "./ShortsInfoLoading";
import DetailPage from "../../pages/DetailPage";
import { ShortsAPI } from "../../util/shorts-axios";
import { DetailApi } from "../../util/details-axios";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

// const ITEM_HEIGHT = Math.round(window.innerHeight) - 64;
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Shorts = ({ shorts, itemHeight, viewDetailLog, closeDetail }) => {
  const [artId, setArtId] = useState();
  const [art, setArt] = useState();
  const [curIndex, setCurIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setIsDragging(false);
    setOpenDialog(false);
    closeDetail();
  };

  const handleMouseUp = (artId) => {
    // alert("move to detail");
    if (!isDragging) {
      setCurIndex(artId);
      setOpenDialog(true);
      viewDetailLog();
    }
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  const handleMouseDown = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    ShortsAPI.getShorts(shorts.shortsId)
      .then(({ data }) => {
        setArtId(data.data.artId);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (artId != undefined) {
      DetailApi.getDetail(artId)
        .then(({ data }) => {
          setArt(data);
        })
        .catch((err) => console.log(err));
    }
  }, [artId]);

  return (
    <>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        sx={{ marginBottom: "64px" }}
        hideBackdrop={true}
        PaperProps={{
          style: {
            boxShadow: "none",
            maxWidth: "412px",
          },
        }}
      >
        <DetailPage shortsId={curIndex} backIconClick={handleCloseDialog} />
      </Dialog>
      <div className="relative w-full  flex-shrink-0 bg-black " style={{ height: `${itemHeight}px` }}>
        {shorts.type == "VIDEO" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-cover"
            onMouseUp={() => handleMouseUp(shorts.shortsId)}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={() => handleMouseUp(shorts.shortsId)}
          >
            <source src={shorts.mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={shorts.mediaUrl}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-cover"
            onMouseUp={() => handleMouseUp(shorts.shortsId)}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onTouchStart={() => handleMouseUp(shorts.shortsId)}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseDown}
          />
        )}
        {art ? <ShortsInfo title={art.title} shortsId={shorts.shortsId} /> : <ShortsInfoLoading />}
      </div>
    </>
  );
};

export default Shorts;
