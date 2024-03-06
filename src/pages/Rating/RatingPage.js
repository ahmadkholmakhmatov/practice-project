import React, { useState, useEffect } from "react";
import "./rating.scss";
import axios from "axios";
import { Tabs,Tab } from "@mui/material";
import { api_key } from "../../config/config";
import ContentItem from "../../components/ContentItem/ContentItem";
import PaginationContent from "../../components/Pagination/PaginationContent";

const RatingPage = () => {
  const [type, setType] = useState(0);
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const getTrendingMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/${
          type ? "tv" : "movie"
        }/top_rated?api_key=${api_key}&language=en-US&page=${page}`
      )
      .then((res) => {
        setContent(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTrendingMovies();
  }, [page,type]);

  const handleChange = (event, newType) => {
    setType(newType);
    setPage(1);
  };

  return <div className="rating">
  <div className="page-title">
    Top {type ? "Tv Series" : "Movies"}
  </div>
  <Tabs
        value={type}
        onChange={handleChange}
        aria-label="basic tabs example"
        className="my-3"
        centered
      >
        <Tab style={{ color: "white", width: "20%" }} className="tab" label="Find Movies" />
        <Tab style={{ color: "white", width: "20%" }} className="tab" label="Find Tv Series" />
      </Tabs>
      <div className="all-content">
        {console.log(content)}
        {content &&
          content.map((item) => (
            <ContentItem
              id={item.id}
              title={item.title || item.name}
              poster_path={item.poster_path}
              media_type={type? "tv":"movie"}
              vote_average={item.vote_average}
              date={item.first_air_date}
              date2={item.release_date}
              key={item.id}
            />
          ))}
      </div>
      <PaginationContent setPage={setPage} pageNumber={20} />
    
  </div>;
};

export default RatingPage;
