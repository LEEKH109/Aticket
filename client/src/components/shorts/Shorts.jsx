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

const Shorts = ({ shortsId, itemHeight, viewDetailLog, closeDetail, isRendering }) => {
  const [shorts, setShorts] = useState();
  const [art, setArt] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setIsDragging(false);
    setOpenDialog(false);
    closeDetail();
  };

  const handleMouseUp = () => {
    if (!isDragging) {
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
    if (isRendering) {
      ShortsAPI.getShorts(shortsId)
        .then(({ data }) => {
          setShorts(data.data);
        })
        .catch((err) => console.err(err));
    }
  }, [isRendering]);

  useEffect(() => {
    if (shorts) {
      DetailApi.getDetail(shorts.artId)
        .then(({ data }) => {
          setArt(data);
        })
        .catch((err) => console.err(err));
    }
  }, [shorts]);

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
        {shorts && <DetailPage artId={shorts.artId} backIconClick={handleCloseDialog} />}
      </Dialog>
      <div className="relative w-full overflow-hidden flex-shrink-0 bg-black" style={{ height: `${itemHeight}px` }}>
        {isRendering && shorts ? (
          shorts.type == "VIDEO" ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-cover"
              onMouseUp={() => handleMouseUp()}
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
            >
              <source src={shorts.mediaUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              src={shorts.mediaUrl}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-cover"
              onMouseUp={() => handleMouseUp()}
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
            />
          )
        ) : (
          <p>loading</p>
        )}
        {art ? <ShortsInfo title={art.title} shortsId={shorts.shortsId} /> : <ShortsInfoLoading />}
      </div>
    </>
  );
};

export default Shorts;
