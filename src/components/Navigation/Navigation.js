import { useEffect, useState, React } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import "./Navigation.scss";

export default function Navigation() {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState(
    location.pathname === "/"
      ? 0
      : location.pathname === "/movies"
      ? 1
      : location.pathname === "/series"
      ? 2
      : location.pathname === "/rating"
      ? 3:4
  );

  const style = {
    position: "fixed",
    bottom: "0",
    width: "100%",
    backgroundColor: "#2D313A",
  };
  useEffect(() => {
    if (value === 0) {
      history.push("/");
    } else if (value === 1) {
      history.push("/movies");
    } else if (value === 2) {
      history.push("/series");
    } else if (value === 3) {
      history.push("/rating");
    }
    else if (value === 4) {
      history.push("/search");
    }
  }, [value, history]);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className="navigation"
      style={style}
    >
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies"
        icon={<MovieCreationIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Series"
        icon={<TvIcon />}
      />
       <BottomNavigationAction
        style={{ color: "white" }}
        label="Top"
        icon={<TrendingUpIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}
