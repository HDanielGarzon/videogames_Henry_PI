import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <div className={style.container}>
      <div className={style.card}>
        <img src={props.image} alt="" className={style.imagen} />
        <div className={style.details}>
          <Link to={`/detail/${props.id}`} className={style.link}>
            <h2 className={style.detailsName}>{props.name}</h2>
          </Link>
          <h2>{props.description}</h2>
          <h2>{props.rating}</h2>
          <h2>{props.released}</h2>
          <h2 className={style.detailsGenres}>
            {" "}
            {Array.isArray(props.genres)
              ? props.genres.join(", ")
              : props.genres}{" "}
          </h2>
          <h2>{props.platforms}</h2>
        </div>
      </div>
    </div>
  );
}
