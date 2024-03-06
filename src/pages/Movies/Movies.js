import axios from "axios";
import React, { useEffect, useState } from "react";
import { api_key, usedGenres } from "../../config/config";
import ContentItem from "../../components/ContentItem/ContentItem";
import PaginationContent from "../../components/Pagination/PaginationContent";
import Genres from "../../components/Genres/Genres";
import "./movies.scss";

const Movies = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = usedGenres(selectedGenres);

  const getMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-
        US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      )
      .then((res) => {
        setContent(res.data.results);
        setPageNumber(res.data.total_pages);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getMovies();
  }, [page, genreforURL]);

  return (
    <div className="movies">
      <div className="page-title">Movies</div>

      <Genres
        type={"movie"}
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />

      <div className="all-content">
        {content &&
          content.map((item) => (
            <ContentItem
              id={item.id}
              title={item.title || item.name}
              poster_path={item.poster_path}
              media_type={"movie"}
              vote_average={item.vote_average}
              date={item.first_air_date}
              date2={item.release_date}
              key={item.id}
            />
          ))}
      </div>
      <PaginationContent
        setPage={setPage}
        numberPage={500}
        pageNumber={pageNumber > 500 ? 500 : pageNumber}
      />
    </div>
  );
};

export default Movies;
