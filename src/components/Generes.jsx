import axios from "axios";
import React from "react";
import { useEffect } from "react";
import Chip from "@material-ui/core/Chip";

const Generes = ({
  type,
  selectedGeneres,
  setSelectedGeneres,
  setPage,
  generes,
  setGeneres,
}) => {
  const fetchgeneres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=09ee671ac612e93da717c61cdfc2015a&language=en-US`
    );
    setGeneres(data.genres);
  };

  const handleAdd = (genere) => {
    setSelectedGeneres([...selectedGeneres, genere]);
    setGeneres(generes.filter((e) => e.id !== genere.id));
    setPage(1);
  };

  const handleRemove = (genere) => {
    setGeneres([...generes, genere]);
    setSelectedGeneres(selectedGeneres.filter((e) => e.id !== genere.id));
    setPage(1);
  };

  useEffect(() => {
    fetchgeneres();
    return () => {
      setGeneres({});
    };
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGeneres &&
        selectedGeneres?.map((data) => {
          return (
            <Chip
              size="small"
              color="primary"
              clickable
              style={{ margin: "3px" }}
              key={data.id}
              label={data.name}
              onDelete={() => handleRemove(data)}
            />
          );
        })}
      {generes &&
        generes?.map((data) => {
          return (
            <Chip
              size="small"
              clickable
              style={{ margin: "3px" }}
              key={data.id}
              label={data.name}
              onClick={() => handleAdd(data)}
            />
          );
        })}
    </div>
  );
};

export default Generes;
