import React, { useEffect, } from "react";
import { api_key } from "../../config/config";
import { Chip } from "@mui/material";
import axios from "axios";
import "./Genres.scss";

const Genres = ({
  type,
  setGenres,
  genres,
  setSelectedGenres,
  selectedGenres,
  setPage,
}) => {
  const getGenres = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${api_key}&language=en-US`
      )
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGenres();
  }, []);

  const addGenres = (item) => {
    setSelectedGenres([...selectedGenres, item]);
    setGenres(genres.filter((g) => g.id !== item.id));
    setPage(1);
  };
  const removeGenres = (item) => {
    setGenres([...genres, item]);
    setSelectedGenres(selectedGenres.filter((g) => g.id !== item.id));
    setPage(1);
  };
  return (
    <div className="my-3 genres">
    {selectedGenres &&
        selectedGenres.map((item) => (
          <Chip
            className="m-1 chips"
            style={{cursor: "pointer" }}
            key={item.id}
            label={item.name}
            color="primary"
            size="small"
            clickable
            onDelete={() => removeGenres(item)}
          />
        ))}
      {genres &&
        genres.map((item) => (
          <Chip
            className="m-1"
            style={{ backgroundColor: "white", cursor: "pointer" }}
            key={item.id}
            label={item.name}
            size="small"
            clickable
            onClick={() => addGenres(item)}
          />
        ))}
    </div>
  );
};

export default Genres;
