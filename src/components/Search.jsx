import React from "react";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import axios from "axios";
import { useEffect } from "react";
import { Badge } from "@material-ui/core";
import CustomPagination from "./CustomPagination";
import Mymodal from "./Modal";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchtext, setSearchText] = useState("");
  const [contect, setContent] = useState();
  const [numOfPage, setNumOfPage] = useState();
  const darkTheam = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    const { data } = await axios(
      `https://api.themoviedb.org/3/search/${
        type ? "tv" : "movie"
      }?api_key=09ee671ac612e93da717c61cdfc2015a&language=en-US&query=${searchtext}&page=${page}&include_adult=false`
    );
    setContent(data.results);
    setNumOfPage(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);
  return (
    <div>
      <ThemeProvider theme={darkTheam}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            className="searchBox"
            id="filled-basic"
            label="Search"
            variant="filled"
            style={{ flex: "1" }}
            value={searchtext}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: "10px" }}
            onClick={fetchSearch}
          >
            🔍
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(events, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab label="Search Movies" style={{ width: "50%" }} />
          <Tab label="Search Tv Series" style={{ width: "50%" }} />
        </Tabs>

        <div>
          <span className="pageTitle">Search</span>
          <div className="trending">
            {contect?.map((mydata) => {
              return (
                <Mymodal
                  media_type={type == 0 ? "movie" : "tv"}
                  id={mydata.id}
                  className="media"
                  key={mydata.id}
                >
                  <Badge
                    color={mydata.vote_average > 7 ? "primary" : "secondary"}
                    badgeContent={mydata.vote_average}
                  />
                  <img
                    className="poster"
                    src={`https://image.tmdb.org/t/p/w300${mydata.poster_path}`}
                    alt="Loading..."
                  />
                  <b className="title">{mydata.original_title}</b>
                  <div className="subTitle1">
                    <span className="subTitle">
                      {mydata.media_type === "movie" ? "Movie" : "Tv Series"}
                    </span>
                    <span className="subTitle"> {mydata.release_date}</span>
                  </div>
                </Mymodal>
              );
            })}
            {/* {searchtext && !contect && type ? (
              <h2>No tv series found</h2>
            ) : (
              <h2>No Movies found</h2>
            )} */}
          </div>
          {numOfPage > 1 && (
            <CustomPagination setPage={setPage} numberOfPages={numOfPage} />
          )}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Search;
