import axios from "axios";
import React, { useEffect, useState } from "react";
import { api_key } from "../../config/config";
import ContentItem from "../../components/ContentItem/ContentItem";
import "./trending.scss";
import PaginationContent from "../../components/Pagination/PaginationContent";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState([]);
  const getTrendingMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&page=${page}`
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
  }, [page]);

  return (
    <div className="trending">
      <div className="page-title">Trending Today</div>
      <div className="all-content">
        {console.log(content)}
        {content &&
          content.map((item) => (
            <ContentItem
              id={item.id}
              title={item.title || item.name}
              poster_path={item.poster_path}
              media_type={item.media_type}
              vote_average={item.vote_average}
              date={item.first_air_date}
              date2={item.release_date}
              key={item.id}
            />
          ))}
      </div>
      <PaginationContent setPage={setPage} pageNumber={20} />
    </div>
  );
};

export default Trending;
