import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";

import Slide from "@material-ui/core/Slide";


const useStyles = makeStyles((theme) => ({
  dialog: {
    backgroundColor: "#faeee7",
    padding: "0px !important",
    border: "2px solid red",
  },
  image: {
      display: "block",
      maxWidth: "100%",
      height: "auto",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PicModal = ({ openPic, setOpenPic, picUrl }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  useEffect(() => setOpen(openPic), [openPic]);

  const handleClose = () => {
    setOpenPic(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >

        <DialogContent className={classes.dialog}>
          <img src={picUrl} alt="Profile pic"  className={classes.image}/>
    
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PicModal;
