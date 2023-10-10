import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./Detail.module.css";

export default function Detail() {
  const { id } = useParams();

  const [vgDetail, setVgDetail] = useState([]);
  console.log(vgDetail);

  useEffect(() => {
    axios(`http://localhost:3001/videogames/${id}`).then(({ data }) => {
      if (data) {
        setVgDetail(data);
      } else {
        window.alert("No hay personajes con ese ID");
      }
    });
    // return setVgDetail({})
  }, [id]);

  return (
    <div className={style.card}>
      {/* <h1>ahora estamos en Detail</h1> */}
      <div className={style.overlay}>
        <div className={style.overlayContent}>
          <h2 className={style.title}>Name: {vgDetail.name}</h2>
          <h2 className={style.title}>Released: {vgDetail.released}</h2>
          <h2 className={style.title}>Rating: {vgDetail.rating}</h2>
        </div>
        <div className={style.imagen} style={{ backgroundImage: `url(${vgDetail.background_image})` }}>
        <img src={vgDetail.background_image} alt="" />

        </div>
      </div>
      <div className={style.text}>
        <h2>
          Platforms:
          
          {" "}
          {  vgDetail.created === true
          ? vgDetail.platforms
          : vgDetail.platforms &&
            vgDetail.platforms.map(({ platform }) => platform.name).join(", ")
            }    
          
        </h2>
        <h2>
          Genres:{" "}
          {vgDetail.genres &&
            vgDetail.genres.map((genre) => genre.name).join(", ")}
        </h2>
        <h2>Description: {vgDetail.description}</h2>
      </div>
    </div>
  );
}
