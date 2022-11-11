import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CustomPagination from "./CustomPagination";
import { Badge } from "@material-ui/core";
import Generes from "./Generes";
import useGeneres from "../hooks/usegeneres";
import Mymodal from "./Modal";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numberOfPages, setNumOfPage] = useState();
  const [selectedGeneres, setSelectedGeneres] = useState([]);
  const [generes, setGeneres] = useState([]);
  const genereForURL = useGeneres(selectedGeneres);

  const fetchMovies = async () => {
    const { data } = await axios.get(`
https://api.themoviedb.org/3/discover/tv?api_key=09ee671ac612e93da717c61cdfc2015a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genereForURL}`);
    setContent(data.results);
    setNumOfPage(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genereForURL]);

  return (
    <div>
      <Generes
        type="movie"
        selectedGeneres={selectedGeneres}
        setSelectedGeneres={setSelectedGeneres}
        setPage={setPage}
        generes={generes}
        setGeneres={setGeneres}
      />
      <span className="pageTitle">Tv Series</span>
      <div className="trending">
        {content?.map((mydata) => {
          return (
            <Mymodal
              media_type="tv"
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
              <b className="title">{mydata.name}</b>
              <div className="subTitle1">
                <span className="subTitle">Tv Series</span>
                <span className="subTitle"> {mydata.first_air_date}</span>
              </div>
            </Mymodal>
          );
        })}
      </div>
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </div>
  );
};

export default Series;
