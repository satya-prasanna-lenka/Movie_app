import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./style.css";
import ss from "./spl.jpg";

const handleDragStart = (e) => e.preventDefault();

const Carausel = ({ media_type, id }) => {
  const [credits, setCredits] = useState();

  const items = credits?.map((c) => (
    <div className="carasoulItem" width={200}>
      {c.profile_path ? (
        <img
          style={{ marginRight: 10 }}
          src={`https://image.tmdb.org/t/p/w300${c.profile_path}`}
          alt="Loading"
          className="carasoul_img"
          onDragStart={handleDragStart}
        />
      ) : (
        <img
          style={{ marginRight: 10 }}
          src={ss}
          height={100}
          //   width={100}
          alt="Loading"
          className="carasoul_img"
          onDragStart={handleDragStart}
        />
      )}

      {/* //   <img
    //     style={{ marginRight: 10 }}
    //     src={
    //       c.profile_path
    //         ? `https://image.tmdb.org/t/p/w300${c.profile_path}`
    //         : { ss }
    //     }
   
    //     alt="Loading"
    //     className="carasoul_img"
    //     onDragStart={handleDragStart}
    //   /> */}
      <b style={{ color: "#a19392" }} className="carasoul_text">
        {c.name}
      </b>
    </div>
  ));

  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 3,
    },
    1024: {
      items: 7,
    },
  };

  const fatchCard = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=09ee671ac612e93da717c61cdfc2015a&language=en-US`
    );
    setCredits(data.cast);
  };

  useEffect(() => {
    fatchCard();
  }, []);
  return (
    <AliceCarousel
      autoPlay
      responsive={responsive}
      infinite
      disableDotsControls
      disableButtonsControls
      mouseTracking
      items={items}
    />
  );
};

export default Carausel;
