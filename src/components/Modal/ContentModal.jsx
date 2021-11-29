import React, { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { makeStyles } from '@mui/styles';
import "./ContentModal.css";
import { Button } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../config/config'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "2px solid #5a5c5f",
    borderRadius: 10,
    color: "white",
    zIndex: 100
  },
}));

const ContentModal = ({ children, media_type, id }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();


  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div onClick={handleOpen} className="media" color="inherit" style={{ cursor: "pointer" }}>{children}</div>
      <Modal

        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} >
         
          {content && (
            <div className={classes.paper} >
            <Badge color="secondary" onClick={handleClose}  style={{position:"absolute" , right:75 , top:65,zIndex:100, backgroundColor:"#ccc",borderRadius:15}} >
            <CloseIcon sx={{ fontSize: 30 }}  />
          </Badge>
              <div className="ContentModal" >
                <img
                  className="ContentModal__portrait"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}

                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />

                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel media_type={media_type} id={id} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}

export default ContentModal
