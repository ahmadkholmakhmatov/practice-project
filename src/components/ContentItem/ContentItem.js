import React from "react";
import { imgPath } from "../../config/config";
import "./contentItem.scss";
import ContentModal from "../Modal/ContentModal";

const ContentItem = ({
  id,
  title,
  poster_path,
  media_type,
  vote_average,
  date,
  date2,
}) => {
  return (
    <ContentModal id={id} media_type={media_type}>
      <div className="card mb-3 single-content h-100">
        <div className="card-header border-0">
          <img
            className="img-fluid"
            src={poster_path ? imgPath + poster_path : "/assets/no_image.png"}
            alt=""
          />
          <div
            className={
              vote_average > 8
                ? "overlay"
                : vote_average > 6
                ? "overlay overlay-warning"
                : "overlay overlay-danger"
            }
          >
            {vote_average && vote_average.toFixed(1)}
          </div>
        </div>
        <div className="card-body">
          <div className="card-title">{title}</div>
          <div className="card-data d-flex justify-content-between">
            <p className="mb-0">
              {media_type === "tv" ? "Tv series" : "Movie"}
            </p>
            <p className="mb-0">{date === undefined ? date2 : date}</p>
          </div>
        </div>
      </div>
    </ContentModal>
  );
};

export default ContentItem;
