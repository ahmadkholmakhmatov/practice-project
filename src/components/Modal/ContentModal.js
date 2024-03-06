import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import YouTubeIcon from "@mui/icons-material/YouTube";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { api_key, imgPath } from "../../config/config";
import "./Modal.scss";
import ModalCarousel from "../Carousel/ModalCarousel";


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
const ContentModal = ({ children, media_type, id }) => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log(windowDimensions)
  const [style, setStyle] = useState({
    position: "absolute",
    top: "5%",
    left: "5%",
    width: "90%",
    height: "90%",
    bgcolor: "#39445A",
    outline: "none",
    p: 4,
  });

  useEffect(() => {
    if (windowDimensions.width < 601) {
      setStyle({
        ...style,
        top: "4%",
        left: "7%",
        width: "86%",
        height: "92%",
      });
    }
  }, [windowDimensions]);

  const [content, setContent] = useState({});
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [carouselData, setCarouselData] = useState([]);

  const getMoreInfo = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${api_key}&language=en-US`
      )
      .then((res) => {
        setContent(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCarouselInfo = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${api_key}&language=en-US`
      )
      .then((res) => {
        setCarouselData(res.data.cast);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getYoutubeLink = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${api_key}&language=en-US`
      )
      .then((res) => {
        setLink(res.data.results[0]?.key);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMoreInfo();
    getCarouselInfo();
    getYoutubeLink();
  }, []);
  return (
    <>
      <div className="single-content-modal" onClick={handleOpen}>
        {children}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="modal-content">
              <div className="img-container">
                <img
                  className="img-fluid"
                  src={imgPath + content.poster_path}
                  alt=""
                />
              </div>
              <div className="modal-content-body">
                <div className="modal_title">
                  {content?.name || content?.title} (
                  {content?.first_air_date?.slice(0, 4) ||
                    content?.release_date?.slice(0, 4)}
                  )
                </div>
                <i className="tagline d-block">{content?.tagline}</i>
                <div className="modal-overview">{content?.overview}</div>

                <ModalCarousel carouselData={carouselData} />

                <a
                  target="blank"
                  className="modal-youtube-button"
                  href={`https://www.youtube.com/watch?v=${link}`}
                >
                  <YouTubeIcon /> Watch Trailer
                </a>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ContentModal;
