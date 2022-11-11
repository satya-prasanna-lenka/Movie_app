import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { Badge } from "@material-ui/core";
import CustomPagination from "./CustomPagination";
import Mymodal from "./Modal";

const Trending = () => {
  const [contect, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const fetchingTreanding = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=09ee671ac612e93da717c61cdfc2015a&page=${page}`
    );
    setContent(data.results);
  };

  useEffect(() => {
    fetchingTreanding();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {contect?.map((mydata) => {
          return (
            <Mymodal
              media_type={mydata.media_type}
              id={mydata.id}
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
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
