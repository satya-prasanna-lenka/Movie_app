import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import MovieIcon from "@material-ui/icons/Movie";
import TvIcon from "@material-ui/icons/Tv";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: "0",
    backgroundColor: "#2d313a",
    zIndex: "100",
  },
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState("trending");

  const navigate = useNavigate();
  useEffect(() => {
    if (value === "trending") {
      navigate("/");
    } else if (value === "movie") {
      navigate("/movies");
    } else if (value === "series") {
      navigate("/series");
    } else if (value === "search") {
      navigate("/search");
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Trending"
        value="trending"
        style={{ color: "white" }}
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        label="Movie"
        value="movie"
        icon={<MovieIcon />}
        style={{ color: "white" }}
      />
      <BottomNavigationAction
        label="Tv Series"
        value="series"
        icon={<TvIcon />}
        style={{ color: "white" }}
      />
      <BottomNavigationAction
        label="Search"
        value="search"
        icon={<SearchIcon />}
        style={{ color: "white" }}
      />
    </BottomNavigation>
  );
}
