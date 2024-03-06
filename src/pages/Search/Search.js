import React, { useState, useRef, useEffect } from "react";
import { TextField, Tabs, Tab } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ContentItem from "../../components/ContentItem/ContentItem";
import PaginationContent from "../../components/Pagination/PaginationContent";
import { api_key } from "../../config/config";
import "./search.scss";
import axios from "axios";
const Search = () => {
  const [visible,setVisible]=useState(false);
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const [content, setContent] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getSearchedMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?api_key=${api_key}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
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
    getSearchedMovies();
  }, [page, type]);

  const handleChange = (event, newType) => {
    setType(newType);
    setPage(1);
  };
  const handleKey = (e) => {
    if (e.key === "Enter") {
      getSearchedMovies();
      setVisible(true);
    }
  };
  const handleClick=()=>{
    getSearchedMovies();
    setVisible(true);
  }
  return (
    <div className="search">
      <div className="row my-3">
        <div className="search-input">
          <TextField
            className="input-field me-3"
            id="filled-basic"
            label="Filled"
            variant="filled"
            onKeyPress={(e) => handleKey(e)}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search-btn" onClick={handleClick}>
            <SearchIcon />
          </button>
        </div>
      </div>
      <Tabs
        value={type}
        onChange={handleChange}
        aria-label="basic tabs example"
        className="my-2 tabs"
      >
        <Tab style={{ color: "white", width: "20%" }} className="tab" label="Find Movies" />
        <Tab style={{ color: "white", width: "20%" }} className="tab" label="Find Tv Series" />
      </Tabs>
      <div className="search-content">
        {content &&
          content.map((item) => (
            <ContentItem
              id={item.id}
              title={item.title || item.name}
              poster_path={item.poster_path}
              media_type={type ? "tv" : "movie"}
              vote_average={item.vote_average}
              date={item.first_air_date}
              date2={item.release_date}
              key={item.id}
            />
          ))}
      </div>
      {pageNumber && pageNumber > 1 && (
        <PaginationContent setPage={setPage} pageNumber={pageNumber} />
      )}
      {visible &&
        content.length === 0 &&
        (type ? (
          <h2>Tv Series are not found</h2>
        ) : (
          <h2>Movies are not found</h2>
        ))}
      {console.log(searchText && content.length === 0)}
    </div>
  );
};

export default Search;
