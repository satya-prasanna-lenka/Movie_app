import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import "./style.css";
import Carausel from "./Carausel";

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
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function Mymodal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=09ee671ac612e93da717c61cdfc2015a&language=en-US`
    );
    setContent(data);
  };
  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=09ee671ac612e93da717c61cdfc2015a&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);
  return (
    <>
      <div className="media" type="button" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="contentModal">
                <img
                  className="content_portrait"
                  src={
                    content.poster_path
                      ? `https://image.tmdb.org/t/p/w300${content.poster_path}`
                      : ""
                  }
                  alt="Loading"
                />

                <div className="contentModel_about">
                  <span className="contentModel_title">
                    {content.name || content.title}(
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "...."
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  {content.overview && (
                    <p className="about_more">{content.overview}</p>
                  )}
                  <div height={300} className="carasole">
                    <Carausel media_type={media_type} id={id} />
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    target="_blank}"
                    startIcon={<YouTubeIcon />}
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
