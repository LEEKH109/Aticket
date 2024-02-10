import { useState, useEffect, forwardRef } from "react";
import ShortsInfo from "./ShortsInfo";
import DetailPage from "../../pages/DetailPage";
import { ShortsAPI } from "../../util/shorts-axios";
import { DetailApi } from "../../util/details-axios";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

// const ITEM_HEIGHT = Math.round(window.innerHeight) - 64;
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Shorts = ({ shorts, itemHeight }) => {
  const [artId, setArtId] = useState();
  const [art, setArt] = useState();
  const [curIndex, setCurIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setIsDragging(false);
    setOpenDialog(false);
  };

  const handleMouseUp = (artId) => {
    if (!isDragging) {
      setCurIndex(artId);
      setOpenDialog(true);
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
        maxWidth="xs"
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
      <div className="relative w-full flex-shrink-0" style={{ height: `${itemHeight}px` }}>
        {shorts.type == "VIDEO" ? (
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            onMouseUp={() => handleMouseUp(shorts.shortsId)}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
          >
            <source src={shorts.mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={shorts.mediaUrl}
            className="w-full h-full object-cover"
            onMouseUp={() => handleMouseUp(shorts.shortsId)}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
          />
        )}
        {art && <ShortsInfo title={art.title} shortsId={shorts.shortsId} />}
      </div>
    </>
  );
};

export default Shorts;
