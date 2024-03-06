import React from "react";
import AliceCarousel from "react-alice-carousel";
import { imgPath } from "../../config/config";
import "./modalcarousel.scss";

const ModalCarousel = ({ carouselData }) => {
  const responsive = {
    0: { items: 3 },
    600: { items: 4 },
    1024: { items: 7 },
  };

  const carouselItems = () => {
    return carouselData.map((item) => (
      <div key={item.id} >
        <img
          className="rounded carousel-image"
          src={imgPath + item?.profile_path}
          alt=""
        />
        <h6>{item.name}</h6>
      </div>
    ));
  };

  return (
    <div>
      <AliceCarousel
        mouseTracking
        disableDotsControls
        disableButtonsControls
        autoPlay
        infinite
        autoPlayInterval={700}
        items={carouselItems()}
        responsive={responsive}
      />
    </div>
  );
};

export default ModalCarousel;
